import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeComponent } from './attribute.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeService } from 'src/app/services/attribute.service';
import { DataService } from 'src/app/services/data.service';
import { AttributeMockService } from 'src/app/mocks/attribute-mock.service';

describe('AttributeComponent', () => {
  let component: AttributeComponent;
  let fixture: ComponentFixture<AttributeComponent>;
  let mock;

  beforeEach(async(() => {
    mock = {
      currentFormData: {
        select1: {
          id: 2
        }
      }
    }

    TestBed.configureTestingModule({
      imports: [MatTableModule, HttpClientTestingModule],
      declarations: [AttributeComponent],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: AttributeService, useClass: AttributeMockService
        },
        {
          provide: DataService, useValue: mock
        },
      ],
    }).compileComponents();



  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component.attribute.length).toBe(2);
  });
});
