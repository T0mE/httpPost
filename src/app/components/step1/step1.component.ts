import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { IClient } from 'src/app/type/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';
import { IOutputData } from 'src/app/type/outputData';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component implements OnInit {
  form: FormGroup;
  data: IClient[] = [];
  dialogRef: MatDialogRef<InfoComponent>;
  turnOff: boolean = this.dataService.currentFormData.disableSelect;

  constructor(
    private router: Router,
    private dataService: DataService,
    private client: ClientService,
    public dialog: MatDialog
  ) {
    const { select1, select2, input } = this.dataService.currentFormData;
    this.form = new FormGroup({
      select1: new FormControl(
        { value: select1 ? select1.id_client : '', disabled: this.turnOff },
        [Validators.required]
      ),
      select2: new FormControl(select2 ? select2.id_client : '', [
        Validators.required,
      ]),
      input: new FormControl(input || '', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.client.downloadJson().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  modalConfirmObservable(input: number, value: number): Observable<boolean> {
    this.dialogRef = this.dialog.open(InfoComponent, {
      disableClose: false,
      data: {
        message:
          value > input
            ? 'Zwiekasz liczbe zamowien?'
            : 'Zmniejszasz liczbe zamowien?',
      },
    });

    return this.dialogRef.afterClosed();
  }

  onNextBtnClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }

    const { value } = this.form.get('input');
    const { input } = this.dataService.currentFormData;
    if (!input || value === input) {
      this.processFormData();
      return;
    }

    const subscription = this.modalConfirmObservable(+input, value).subscribe(
      (result) => {
        if (result) {
          this.processFormData();
        }

        subscription.unsubscribe();
      }
    );
  }

  processFormData(): void {
    const {
      data,
      form: {
        value,
        controls: { select1, select2, input },
      },
    } = this;
    const selectData = data.find(
      ({ id_client }) => id_client === parseInt(select1.value)
    );
    const selectData2 = data.find(
      ({ id_client }) => id_client === parseInt(select2.value)
    );
    const {
      select1: currentSelect1,
      input: currentInput,
      resp,
    } = this.dataService.currentFormData;

    if (currentSelect1 && currentSelect1.id_client !== selectData.id_client) {
      this.dataService.clearData();
    } else if (currentInput && +currentInput > +input.value) {
      const slicedRes: IOutputData[] = resp.map((el) => {
        const newValus = Object.entries(el.value).filter(([key, value]) => {
          return +key < +currentInput;
        });
        const finaleValues: { [key: string]: string } = {};
        newValus.forEach(([key, value]) => {
          finaleValues[key] = value;
        });
        return {
          ...el,
          value: finaleValues,
        };
      });
      this.dataService.addFormData({ resp: slicedRes });
    }

    this.dataService.addFormData({
      ...value,
      select1: selectData,
      select2: selectData2,
    });
    this.router.navigate(['step', '2']);
  }
}
