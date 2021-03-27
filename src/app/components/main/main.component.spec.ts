import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DaneService } from 'src/app/services/dane.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MainComponent } from './main.component';
import { Overlay } from '@angular/cdk/overlay';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      declarations: [MainComponent],
      providers: [DaneService/*, MatDialog*/]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text atribute with start value as null', () => {
    expect(component.text).toBeNull();
  });

  // it('should render "main works!" text', () => {
  //   expect(((fixture.nativeElement as HTMLDivElement).querySelector('.test') as HTMLParagraphElement)).toEqual('main works!');
  // });
});
