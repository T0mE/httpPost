import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/type/client';

interface SampleData {
  id: number;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  displayColumns: string[] = ['id', 'name', 'empid'];

  constructor(public dialog: MatDialogRef<DialogComponent>, private cl: ClientService, @Inject(MAT_DIALOG_DATA) public modalData: SampleData) {
    console.log(this.modalData.id)
  }

  // dataSource = new MatTableDataSource<IClient>([]);
  data: IClient[] = []

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.cl.downloadJson(/*this.modalData.id*/).then(data => {
      this.data = data
    })
  }



}
