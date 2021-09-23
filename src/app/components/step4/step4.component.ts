import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { Label } from 'src/app/type/label';
import { FormData as FormDataInterface } from './../../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css'],
})
export class Step4Component implements OnInit {
  data: any;
  filterOption: Observable<string[]>;
  lastLabelData: Label[] = [];
  searchLabel = new FormControl();

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) {
    this.data = Object.entries(this.dataService.currentFormData);
  }
  url = 'http://localhost:8443/label/list/?label=';
  ngOnInit(): void {
    this.filterOption = this.searchLabel.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        return this.http.get<Label[]>(this.url + value);
      }),
      map((data) => {
        this.lastLabelData = data;
        return data
          .map((name) => name.label)
          .filter((res) => res.startsWith(this.searchLabel.value))
          .sort();
      })
    );
    this.setValueIsOrderIsCopy();
  }

  setValueIsOrderIsCopy() {
    if (this.dataService.currentFormData.disableSelect) {
      this.searchLabel.setValue(this.dataService.currentFormData.label.label);
    }
  }
}
