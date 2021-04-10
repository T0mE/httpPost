import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { IClient } from 'src/app/type/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  form: FormGroup
  data: IClient[] = [];
  dialogRef: MatDialogRef<InfoComponent>;


  constructor(private router: Router, private dataService: DataService, private client: ClientService, public dialog: MatDialog) {
    const { select1, select2, input } = this.dataService.currentFormData
    this.form = new FormGroup({
      select1: new FormControl(select1 ? select1.id : '', [Validators.required]),
      select2: new FormControl(select2 ? select2.id : '', [Validators.required]),
      input: new FormControl(input || '', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void {
    this.getAllClients();

  }

  getAllClients() {
    this.client.downloadJson().then(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  modalConfirmObservable(input: string): Observable<boolean> | null {

    const { value } = this.form.get('input');

    if (value !== input) {
      this.dialogRef = this.dialog.open(InfoComponent, {
        disableClose: false,
        data: {
          message: value > input ? 'Zwiekasz liczbe zamowien?' : 'Zmniejszasz liczbe zamowien?'
        }
      })

      return this.dialogRef.afterClosed();
    }

  }


  onNextBtnClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.form.invalid) {
      return
    }

    const { input } = this.dataService.currentFormData;
    if (!input) {
      this.processFormData();
      return
    }

    const subscription = this.modalConfirmObservable(input).subscribe(result => {
      if (result) {
        this.processFormData();
      }

      subscription.unsubscribe();
    })
  }

  processFormData(): void {
    const selectData = this.data.find(({ id }) => id === parseInt(this.form.controls.select1.value))
    const selectData2 = this.data.find(({ id }) => id === parseInt(this.form.controls.select2.value))
    const { select1, input } = this.dataService.currentFormData;
    if ((select1 && select1.id !== selectData.id) || (input && input != this.form.controls.input.value)) {
      this.dataService.clearData();
    }
    this.dataService.addFormData({ ...this.form.value, select1: selectData, select2: selectData2 });
    this.router.navigate(['step', '2']);
  }
}
