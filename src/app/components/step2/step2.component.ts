import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataService, FormData } from 'src/app/services/data.service';
import { Attribute } from 'src/app/type/attribute';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit, OnDestroy {

  private _subscription: Subscription;
  public form: FormGroup
  public file: File;
  public formData: FormData

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private dataService: DataService, private apiService: ApiServiceService, public dialog: MatDialog) {
    this.formData = this.dataService.currentFormData
    console.log(this.formData)
    const { radio, file } = this.formData

    const isSelectedElementActive = this.formData.select1.active;

    this.form = new FormGroup({
      radio: new FormControl(isSelectedElementActive ? radio : 'a', [Validators.required]),
    });

    this.form.updateValueAndValidity();

    console.log(this.form)

    if (radio === 'b') {
      this.form.addControl('file', new FormControl('', [Validators.required]));
    }

    this._subscription = this.form.valueChanges.subscribe(formData => {
      const { radio } = formData;
      if (radio === 'a') {
        if (this.form.controls.file) {
          this.form.removeControl('file');
        }
      } else if (!this.form.controls.file) {
        this.form.addControl('file', new FormControl('', [Validators.required]));
      }
    })
  }
  dialogRef: MatDialogRef<AttributeComponent>

  ngOnInit(): void {

  }



  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  saveFile(event: any): void {
    const { files } = event.target;
    this.file = files[0];
    this.dataService.addFormData({ file: files[0] })
    this.form.controls.file.setAsyncValidators(this.fileValidator.bind(this, this.file));
    this.form.controls.file.updateValueAndValidity();
  }

  async fileValidator(file: File, control: AbstractControl): Promise<ValidationErrors | null> {
    try {
      const { select1: id, select2: response } = this.dataService.currentFormData;
      const resp = await this.apiService.validJsonFile(file);
      console.log(resp)
      this.dataService.addFormData({ resp })
      return;
    } catch (error) {
      console.log(error)
      return { errorMessage: error.msg }
    }
  }

  onNextBtnClick(event) {
    event.preventDefault();
    console.log(this.form)
    if (this.form.valid) {
      this.dataService.addFormData(this.form.value);
      this.router.navigate(['step', '3']);
    }
  }

  onPreviewBtnClick(event) {
    event.preventDefault();

    this.router.navigate(['step', '1']);
  }

  openDialogWithAttribute() {
    this.dialogRef = this.dialog.open(AttributeComponent), {
      disableClose: false
    }
  }

}


