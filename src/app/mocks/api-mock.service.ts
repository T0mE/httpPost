import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  constructor() { }

  downloadJson = (): Promise<IClient[]> => {
    return Promise.resolve(mockData)
  }
  // getUserList = (): Observable<IClient[]> => {
  //   const subject = new Subject<IClient[]>();
  //   setTimeout(() => {
  //     subject.next(mockData)
  //   }, 100)
  //   return subject.asObservable();
  // }

}
