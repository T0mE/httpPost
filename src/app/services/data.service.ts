import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RadioEnum } from '../data/radio.enum';
import { IClient } from '../type/client';
import { Label } from '../type/label';
import { IOutputData } from '../type/outputData';

export interface FormData {
  select1?: IClient;
  select2?: IClient;
  input?: string | null;
  radio?: RadioEnum;
  resp?: IOutputData[];
  radio2?: string;
  file?: File;
  label?: Label;
  disableSelect?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private _currentFormData: FormData = {};
  private _data$ = new Subject<FormData>();

  get currentFormData(): FormData {
    return this._currentFormData;
  }

  constructor() {
    this._data$.subscribe((data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (data[key] !== undefined) {
          this._currentFormData[key] = value;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._data$.unsubscribe();
  }

  clearData(): void {
    this._currentFormData = {};
  }

  clearDataByFieldName(keys: string[]): void {
    keys.forEach((key) => {
      this._currentFormData[key] = undefined;
    });
  }

  addFormData(newData: FormData): void {
    console.log(this, newData);
    this._data$.next(newData);
  }

  getFormObservable(): Observable<FormData> {
    return this._data$.asObservable();
  }

  getFormSubject(): Subject<FormData> {
    return this._data$;
  }
}
