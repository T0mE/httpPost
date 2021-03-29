import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private attri: AttributeService, private fb: FormBuilder, private dataService: DataService) {

  }

  get controls() {
    return Object.keys(this.productForm.controls).reverse()
  }

  get canAddNewFormGroup(): boolean {
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


  showData(): void {
    console.log(this.productForm.value)
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
    this.attri.attr('2').then(data => {
      this.attribute = data;
      this.productForm = new FormGroup({
        [`attributes-${this.index++}`]: new FormGroup(this.prepareFields())
      });
      this.productForm.controls
    })
  }


  addQuantity() {
    this.productForm.addControl(`attributes-${this.index++}`, new FormGroup(this.prepareFields()))
  }

  removeQuantity(controlName: string) {
    console.log(controlName)
    this.productForm.removeControl(controlName)
  }

}
