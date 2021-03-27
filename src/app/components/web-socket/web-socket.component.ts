import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { map, tap } from 'rxjs/operators';
import { IClient } from 'src/app/type/client';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }
  // transactions$ = this.client.dataUpdates$().pipe(
  //   map(rows => rows.data),
  //   tap({
  //     error: err => console.log(err),
  //     complete: () => console.log('Connexion Closed')
  //   })
  // );

  // ngOnDestroy() {
  //   this.client.disconnect();
  // }

}
