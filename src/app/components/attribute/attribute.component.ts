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

  constructor(private router: Router, private attri: AttributeService, private fb: FormBuilder, private dataService: DataService) {

  }

  get controls() {
    return Object.keys(this.productForm.controls);
  }

  ngOnInit(): void {
    this.getAttributes();
  }

  prepareFields(): { [key: string]: AbstractControl; } {
    const preparedFields = {};
    this.attribute.forEach(({ idArt, required }) => {
      preparedFields[idArt] = new FormControl('', [required ? Validators.required : undefined])
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
    const index = Object.keys(this.productForm).length
    this.productForm.addControl(`attributes-${this.index++}`, new FormGroup(this.prepareFields()))
    console.log(this.productForm.controls)
  }

  removeQuantity(controlName: string) {
    console.log(controlName)
    this.productForm.removeControl(controlName)
  }

}
