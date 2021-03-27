import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaneService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8443/dane/danaJsonb?id=1';

  downloadJson(): Promise<any> {

    return this.http.get(this.url, { responseType: 'blob' }).toPromise();
  }
}
