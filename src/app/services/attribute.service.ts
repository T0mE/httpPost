import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../type/attribute';
@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:8443/attribute/car/';

  attr(id: string): Promise<Attribute[]> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Attribute[]>(this.baseURL, { params }).toPromise();
  }
}
