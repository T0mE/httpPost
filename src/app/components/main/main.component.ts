import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DaneService } from 'src/app/services/dane.service';

import * as FileSaver from 'file-saver';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dialogRef: MatDialogRef<DialogComponent>

  constructor(private router: Router, private dane: DaneService, public dialog: MatDialog) { }

  text = null;
  ngOnInit(): void {
  }

  goPlaces() {
    this.router.navigateByUrl('/person');
  }

  download() {
    this.dane.downloadJson().then(data => {
      console.log(data)
      FileSaver(data, 'dane.json');
    }
    ).catch(error => {
      (error.error as Blob).text().then(text => {
        const responseText = JSON.parse(text);
        this.text = responseText.message;
      })
    })
  }

  open(id = 5) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id
      }
    });
  }
}
