import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiMockService, mockData } from 'src/app/mocks/api-mock.service';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/type/client';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let de: DebugElement;
  let mockServ: ApiMockService;

  // let testCars: IClient[] = [
  //   { id: 1, name: 'Car', empid: 'car', active: true },
  //   { id: 2, name: 'BMW', empid: 'car', active: true },
  //   { id: 3, name: 'Fiat', empid: 'car', active: true }
  // ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [DialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: ClientService, useClass: ApiMockService
        },
      ],
    })
      .compileComponents();

    // mockServ = TestBed.get(ApiMockService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the table', () => {
    let table = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined();
  });

  it(`should display ${mockData.length} rows`, fakeAsync(() => {
    // setTimeout(() => {
    fixture.detectChanges();
    flush();

    let tableRows = fixture.nativeElement.querySelectorAll('tbody [role="row"]');
    expect(tableRows.length).toBe(mockData.length);
    //   done();
    // }, 500)
    // done();
  }));
});