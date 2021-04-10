import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import * as data from './../../data/db.json';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { IClient } from 'src/app/type/client';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface IColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements OnInit {
  pageSize = 5;
  pageNumber = 0;

  length = 0;

  client: IClient[];
  dataSource = new MatTableDataSource<IClient>([]);
  columnsToDisplay: IColumn[] = [
    {
      label: 'Custom name',
      key: 'name'
    },
    {
      label: 'Custom id',
      key: 'id',
    },
    {
      label: 'Custom epid name',
      key: 'empid'
    }
  ];

  keys: string[] = this.columnsToDisplay.map(column => column.key);
  expandedElement: IClient | null;

  constructor(private apiService: ApiServiceService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  setPageAndGetNextValue = (event: PageEvent) => {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;

  }

  ngOnInit(): void {
    this.getClient();
  }

  zrobCos = (id: number) => {
    const newId = Math.floor(Math.random() * 1000);
    this.apiService.updateEmpid(id.toString(), newId).then(() => {
      const rows = this.dataSource.data.filter(row => row.id === id);
      console.log(rows);
      console.log(this.dataSource);

      rows.forEach(row => row.empid = newId.toString());
    });

  }


  getClient() {
    this.apiService.getPeople().then(data => {
      const newData = data.map(client => {
        // client.date;
        // client.date = new Date(client.date).toLocaleDateString();
        client.name = client.name.toLowerCase();
        return client;
      })
      this.client = newData;
      this.dataSource = new MatTableDataSource<IClient>(newData);
    })
  }
}

// export interface People {
//   name: string;
//   id: number;
//   status: string;
//   nr: number;
// }

