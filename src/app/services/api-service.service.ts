import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/Person';
import { IClient } from '../type/client';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseURL = 'http://localhost:8443/client/';

  baseURL2 = 'http://localhost:8443/client/empid';
  constructor(private http: HttpClient) { }

  getPeople = async (): Promise<IClient[]> => {
    const clinet = await this.http.get<IClient[]>(this.baseURL + 'clients').toPromise()
      .catch((error: HttpErrorResponse) => {
        throw Error(error.message);
      });
    return clinet;
  }

  updateEmpid(id: string, empid: number): Promise<void> {
    const body = JSON.stringify({ empid });
    const params = new HttpParams()
      .set('empid', id);
    const head = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<void>(this.baseURL2, body, { params, headers: head }).toPromise();
  }

  addPerson(person: Person): Promise<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(person);
    return this.http.post("http://localhost:35000/" + 'people', body, { 'headers': headers }).toPromise();
  }

  validJsonFile(file: File): Promise<any> {
    // let params = new HttpParams()
    //   .set('id', id);
    // params = new HttpParams()
    //   .set('records', records);
    const formData = new FormData();
    formData.append('file', file)
    return this.http.post("http://localhost:8443/file/all", formData).toPromise();
  }
}
