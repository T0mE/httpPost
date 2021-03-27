import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  public form: FormGroup
  constructor(private router: Router, private dataService: DataService) {
    const { radio2 } = this.dataService.currentFormData
    this.form = new FormGroup({
      radio2: new FormControl(radio2 || '', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onNextBtnClick(event) {
    event.preventDefault();
    if (this.form.valid) {
      this.dataService.addFormData(this.form.value);
      this.router.navigate(['step', '4']);
    }
  }

  onPreviewBtnClick(event) {
    event.preventDefault();

    this.router.navigate(['step', '2']);
  }

}
