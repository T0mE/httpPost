import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';

import { Step2Component } from './step2.component';
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}
describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(async(() => {
    const matDialog = new MatDialogMock()
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      // providers: [{
      //   provide: DataService, useClass: //mock
      // },
      // {
      //   provide: ApiServiceService, useClass: //mock
      // },
      // { provide: MatDialog, useValue: matDialog }
      // ],
      declarations: [Step2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
