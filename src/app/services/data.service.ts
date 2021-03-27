import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IClient } from '../type/client';

export interface FormData {
  select1?: IClient,
  select2?: IClient,
  input?: string | null,
  radio?: string,
  resp?: any,
  radio2?: string,
  file?: File
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private _currentFormData: FormData = {};
  private _data$ = new Subject<FormData>();

  get currentFormData(): FormData {
    return this._currentFormData;
  }

  constructor() {
    this._data$.subscribe(data => {
      if (data.select1 !== undefined) { this._currentFormData.select1 = data.select1; }
      if (data.select2 !== undefined) { this._currentFormData.select2 = data.select2; }
      if (data.input !== undefined) { this._currentFormData.input = data.input; }
      if (data.radio !== undefined) { this._currentFormData.radio = data.radio; }
      if (data.resp !== undefined) { this._currentFormData.resp = data.resp; }
      if (data.radio2 !== undefined) { this._currentFormData.radio2 = data.radio2; }
      if (data.file !== undefined) { this._currentFormData.file = data.file; }
    });
  }

  ngOnDestroy(): void {
    this._data$.unsubscribe();
  }

  clearData(): void {
    this._currentFormData = {};
  }

  addFormData(newData: FormData): void {
    this._data$.next(newData)
  }

  getFormObservable(): Observable<FormData> {
    return this._data$.asObservable();
  }

  getFormSubject(): Subject<FormData> {
    return this._data$;
  }

}
