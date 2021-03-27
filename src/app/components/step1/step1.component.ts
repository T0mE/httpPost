import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { IClient } from 'src/app/type/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  form: FormGroup
  data: IClient[] = [];


  constructor(private router: Router, private dataService: DataService, private client: ClientService) {
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



  onNextBtnClick(event) {
    event.preventDefault();
    console.log(this.form)
    if (this.form.valid) {
      const selectData = this.data.find(({ id }) => id === parseInt(this.form.controls.select1.value))
      const selectData2 = this.data.find(({ id }) => id === parseInt(this.form.controls.select2.value))
      console.log(selectData2);
      this.dataService.addFormData({ ...this.form.value, select1: selectData, select2: selectData2 });
      this.router.navigate(['step', '2']);
    }
  }
}
