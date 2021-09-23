import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttributeService } from 'src/app/services/attribute.service';
import { DataService } from 'src/app/services/data.service';
import {
  Attribute,
  AttributeFromForm,
  AttributeFromFormGroup,
} from 'src/app/type/attribute';
import { IOutputData } from 'src/app/type/outputData';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css'],
})
export class AttributeComponent implements OnInit {
  list: string[] = ['account', 'number_account'];
  productForm: FormGroup;
  attribute: Attribute[] | null;
  index: number = 0;
  id;
  modalClose = false;

  constructor(
    public dialog: MatDialogRef<AttributeComponent>,
    private attri: AttributeService,
    private dataService: DataService
  ) {
    const { select1, resp } = this.dataService.currentFormData;
    this.id = select1.id_client;
  }

  get controls() {
    return Object.keys(this.productForm.controls).reverse();
  }

  get canAddNewFormGroup(): boolean {
    console.log(this.controls.length < +this.dataService.currentFormData.input);
    return this.controls.length < +this.dataService.currentFormData.input;
  }

  get isAllCurrentFormGrupValid(): boolean {
    const foundInfalidFormGroup = Object.values(this.productForm.controls).find(
      (control) => {
        return control.invalid;
      }
    );

    return foundInfalidFormGroup ? false : true;
  }

  isReadOnly(formName: string): boolean {
    const keys = Object.keys(this.productForm.controls);
    return keys.indexOf(formName) != keys.length - 1;
  }

  rebuildDataToDBFormat(): IOutputData[] {
    const { value } = this.productForm;
    const elName = 'dicAttr';
    const res = [];
    Object.values(value).forEach((group, indexOfFormGrop) => {
      Object.entries(group).forEach(([key, value]) => {
        const foundElement = res.find((el) => el[elName] === key);
        if (!foundElement) {
          const atributeObj = {
            [elName]: key,
            value: {},
          };
          if (value && value !== '') {
            atributeObj.value[indexOfFormGrop + 1] = value;
          }
          res.push(atributeObj);
        } else {
          const index = res.indexOf(foundElement);
          if (value && value !== '') {
            res[index].value[indexOfFormGrop + 1] = value;
          }
        }
      });
    });
    return res;
  }

  saveForm() {
    const dataToSave = this.rebuildDataToDBFormat();
    this.dataService.addFormData({ resp: dataToSave });
    this.dialog.close();
    // this.router.navigate(['step', '3']);
  }

  ngOnInit(): void {
    this.getAttributes(this.id);
  }

  prepareFields(attributeFromForm?: AttributeFromForm): {
    [key: string]: AbstractControl;
  } {
    const preparedFields = {};
    this.attribute.forEach((attribute) => {
      const { attr, required } = attribute;
      const fieldValue = attributeFromForm ? attributeFromForm[attr] : '';
      console.log(attributeFromForm, attribute);
      preparedFields[attr] = new FormControl(
        fieldValue,
        required ? [Validators.required] : undefined
      );
    });
    return preparedFields;
  }

  prepareFormGroup(attributesFromForm: AttributeFromForm[]): FormGroup {
    const mainFormGroupObj = {};
    attributesFromForm.forEach((group, index) => {
      mainFormGroupObj[`attributes - ${index}`] = new FormGroup(
        this.prepareFields(group)
      );
    });
    this.index = attributesFromForm.length;

    return new FormGroup(mainFormGroupObj);
  }

  getAttributes(id: string) {
    const { select1, resp } = this.dataService.currentFormData;
    this.attri.attr(id).then((data) => {
      this.attribute = data;
      if (resp) {
        const correctValue = this.rebuildData(resp);
        this.productForm = this.prepareFormGroup(correctValue);
      } else {
        this.productForm = new FormGroup({
          [`attributes - ${this.index++}`]: new FormGroup(this.prepareFields()),
        });
      }
    });
  }

  rebuildData(data: IOutputData[]): AttributeFromForm[] {
    const formGroupObj = {};
    const keyname = 'dicAttr';
    const formData = [];
    data.forEach((el) => {
      formGroupObj[el[keyname]] = null;
    });
    const keys = Object.keys(formGroupObj);

    data.forEach((el, index) => {
      //typy
      const obj = Object.entries(el.value);
      const currentAttrubuteNumber = keys[index];
      const foundArrayEl = formData.find(
        (el) => el[currentAttrubuteNumber] === null
      ); // sprawdzamy czy istnieje obieklt z takim kluczem atrybutu
      obj.forEach(([key, value], indexEl) => {
        // wartosci danego typu
        if (foundArrayEl) {
          const indexOfFoundFormEl = +key - 1;
          formData[indexOfFoundFormEl][currentAttrubuteNumber] = value; // sprawdzic linijke
        } else {
          const newFormGroupObj = Object.assign({}, formGroupObj);
          newFormGroupObj[currentAttrubuteNumber] = value;
          formData.push(newFormGroupObj);
        }
      });
    });

    return formData;
  }

  addQuantity() {
    this.productForm.addControl(
      `attributes - ${this.index++}`,
      new FormGroup(this.prepareFields())
    );
  }

  removeQuantity(controlName: string) {
    console.log(controlName);
    this.productForm.removeControl(controlName);
  }

  tryCloseDialog(): void {
    //const { value } = this.productForm;
    const { resp } = this.dataService.currentFormData;
    const dataToSave = this.rebuildDataToDBFormat();

    // 1  - brak danych w formularzu
    const isAnyData = dataToSave.find(
      (attr) => Object.values(attr.value).length > 0
    );
    console.log(isAnyData);
    if (!isAnyData) {
      this.dialog.close();
      return;
    }

    // 2 - te same dane

    const isSameAsSavedData =
      JSON.stringify(resp) === JSON.stringify(dataToSave);
    if (isSameAsSavedData) {
      this.dialog.close();
      return;
    }

    this.modalClose = true;
  }
}
