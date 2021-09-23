import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8443/label/list';
}
