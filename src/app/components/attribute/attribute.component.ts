import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttributeService } from 'src/app/services/attribute.service';
import { DataService } from 'src/app/services/data.service';
import { Attribute } from 'src/app/type/attribute';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {


  list: string[] = ['account', 'number_account'];
  productForm: FormGroup;
  attribute: Attribute[] | null;
  index: number = 0;
  //data: Attribute[];


  constructor(public dialog: MatDialogRef<AttributeComponent>, private router: Router, private attri: AttributeService, private fb: FormBuilder, private dataService: DataService) {

  }

  get controls() {
    return Object.keys(this.productForm.controls).reverse()
  }

  get canAddNewFormGroup(): boolean {
    console.log(this.controls.length < +this.dataService.currentFormData.input)
    return this.controls.length < +this.dataService.currentFormData.input;
  }

  get isAllCurrentFormGrupValid(): boolean {
    const foundInfalidFormGroup = Object.values(this.productForm.controls).find(control => {
      return control.invalid;
    })

    return foundInfalidFormGroup ? false : true;
  }

  isReadOnly(formName: string): boolean {
    const keys = Object.keys(this.productForm.controls);
    return keys.indexOf(formName) != keys.length - 1
  }


  // showData(): void {
  //   let result = [];
  //   const dataBase = [];

  //   for (const elemet of this.controls) {
  //     result.push(this.productForm.controls[elemet].value)
  //   }

  //   const keyObject = Object.keys(result[0])
  //   const sizeArray = result.length

  //   result.reverse();
  //   for (const el of keyObject) {
  //     let i = 1;
  //     let a = '';


  //     result.forEach(item => {
  //       if (item[el] !== '') {
  //         i === sizeArray ? a += `"${i}": "${item[el]}"` : a += `"${i}": "${item[el]}",`
  //       }
  //       i++;
  //     });

  //     console.log(a);
  //     const data = `{ "dicAttr": ${el}, value : {${a}}}`;
  //     dataBase.push(data)
  //   }
  //   console.log(dataBase);


  // }

  showData(): Object {
    const { value } = this.productForm;
    const elName = 'dicAttr';
    const res = [];
    Object.values(value).forEach((group, indexOfFormGrop) => {
      Object.entries(group).forEach(([key, value]) => {
        if (value !== '') {
          const foundElement = res.find(el => el[elName] === key);
          if (!foundElement) {
            res.push({
              [elName]: key,
              value: {
                [indexOfFormGrop + 1]: value
              }
            })
          } else {
            const index = res.indexOf(foundElement);
            res[index].value[indexOfFormGrop + 1] = value
          }
        }

      })
    })
    return res;
  }

  saveForm() {
    const dataToSave = this.showData();
    this.dataService.addFormData({ resp: dataToSave })
    this.dialog.close();
    this.router.navigate(['step', '3']);
  }


  ngOnInit(): void {
    this.getAttributes();
  }

  prepareFields(): { [key: string]: AbstractControl; } {
    const preparedFields = {};
    this.attribute.forEach(({ attr, required }) => {
      preparedFields[attr] = new FormControl('', required ? [Validators.required] : undefined)
    })
    return preparedFields
  }

  getAttributes() {
    this.attri.attr('1').then(data => {
      this.attribute = data;
      this.productForm = new FormGroup({
        [`attributes - ${this.index++}`]: new FormGroup(this.prepareFields())
      });
      this.productForm.controls
    })
  }


  addQuantity() {
    this.productForm.addControl(`attributes - ${this.index++}`, new FormGroup(this.prepareFields()))
  }

  removeQuantity(controlName: string) {
    console.log(controlName)
    this.productForm.removeControl(controlName)
  }

}
