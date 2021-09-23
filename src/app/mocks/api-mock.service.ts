import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Attribute } from '../type/attribute';

// import { Client } from '../model/Client';
import { IClient } from '../type/client';

export const mockData: IClient[] = [
  {
    id: 1,
    name: 'Greg',
    empid: '2323',
    active: true
  },
  {
    id: 2,
    name: 'Greg',
    empid: '2323',
    active: true
  }
]

export const mockDataAttribute: Attribute[] = [
  {
    idArt: 1,
    attr: 1,
    name: 'name',
    required: true,
    client: 1
  },
  {
    idArt: 1,
    attr: 2,
    name: 'surname',
    required: true,
    client: 3
  }
]

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  constructor() { }

  downloadJson = (): Promise<IClient[]> => {
    return Promise.resolve(mockData);
  }


  attribute = (): Promise<Attribute[]> => {
    return Promise.resolve(mockDataAttribute);
  }
  // getUserList = (): Observable<IClient[]> => {
  //   const subject = new Subject<IClient[]>();
  //   setTimeout(() => {
  //     subject.next(mockData)
  //   }, 100)
  //   return subject.asObservable();
  // }

}
