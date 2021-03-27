import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../type/client';


import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private socket$: WebSocketSubject<IClient[]>;

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8443/client/clients';

  downloadJson(): Promise<IClient[]> {
    return this.http.get<IClient[]>(this.url).toPromise();
  }

  getUserList(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.url);
  }



  private connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.url);
    }
    return this.socket$;
  }

  public dataUpdates$() {
    return this.connect().asObservable();
  }

  disconnect() {
    this.connect().complete();
  }



}
