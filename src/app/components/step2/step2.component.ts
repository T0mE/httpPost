import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RadioEnum } from 'src/app/data/radio.enum';
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
  public RadioEnum = RadioEnum;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private dataService: DataService, private apiService: ApiServiceService, public dialog: MatDialog) {
    this.formData = this.dataService.currentFormData
    console.log(this.formData)
    const { radio } = this.formData

    const isSelectedElementActive = this.formData.select1.active;

    this.form = new FormGroup({
      radio: new FormControl(isSelectedElementActive ? radio : RadioEnum.NoData, [Validators.required]),
    });

    this.form.updateValueAndValidity();

    if (radio === RadioEnum.File) {
      this.form.addControl('file', new FormControl('', [Validators.required]));
    }

    this._subscription = this.form.valueChanges.subscribe(formData => {
      const { radio } = formData;
      console.log(radio)
      if (radio === RadioEnum.NoData || radio === RadioEnum.CustomData) {
        if (this.form.controls.file) {
          this.form.removeControl('file');
        }
      } else if (!this.form.controls.file) {
        this.form.addControl('file', new FormControl('', [Validators.required]));
      }
    })
  }

  get inNextBtnDisabled(): boolean {
    console.log(this.form)
    if (!this.form.valid) {
      console.log('x');
      return true
    }

    console.log(this.form.controls.radio.value === RadioEnum.NoData)
    console.log(!this.isGoodCount)
    return this.form.controls.radio.value === RadioEnum.NoData ? false : !this.isGoodCount
  }

  get isGoodCount(): boolean {
    const { input, resp } = this.dataService.currentFormData
    if (!resp) return false;
    let max = 0;
    resp.forEach(attr => {
      const { length } = Object.keys(attr.value || {});
      if (length > max) {
        max = length;
      }
    });

    return max == +input;
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
      // const { select1: id, select2: response } = this.dataService.currentFormData;
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
      const { value: radioValue } = this.form.controls.radio
      this.dataService.addFormData({ radio: radioValue });
      this.router.navigate(['step', '3']);
    }
  }

  onPreviewBtnClick(event) {
    event.preventDefault();

    if (this.dataService.currentFormData.radio === RadioEnum.File) {
      this.dataService.clearDataByFieldName(['resp'])
    }

    this.router.navigate(['step', '1']);
  }

  openDialogWithAttribute() {
    setTimeout(() => {
      console.log(typeof this.form.controls.radio.value)
      this.dataService.addFormData({ radio: this.form.controls.radio.value });
    }, 100)

    if (this.dataService.currentFormData.radio === RadioEnum.File) {
      this.dataService.clearDataByFieldName(['resp'])
    }


    this.dialogRef = this.dialog.open(AttributeComponent, {
      disableClose: true
    });
  }

}


