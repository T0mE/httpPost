import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiMockService } from 'src/app/mocks/api-mock.service';
import { ClientService } from 'src/app/services/client.service';
import { mockData } from 'src/app/mocks/api-mock.service'

import { Step1Component } from './step1.component';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{
        provide: ClientService, useClass: ApiMockService
      }],
      declarations: [Step1Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should render ${mockData.length + 1} options field in Select1 `, () => {

    fixture.detectChanges()
    const options = (fixture.nativeElement as HTMLDivElement).querySelectorAll('select[formControlName="select1"] option')
    expect(options.length).toBe(mockData.length + 1);

  });
});
