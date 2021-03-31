import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormData as FormDataInterface } from './../../services/data.service'
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  data: any;
  constructor(private router: Router, private dataService: DataService) {
    this.data = Object.entries(this.dataService.currentFormData);
  }


  ngOnInit(): void {

  }
}
