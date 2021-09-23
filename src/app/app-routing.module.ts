import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PersonComponent } from './components/person/person.component';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step2Guard } from './components/step2/step2.guard';
import { Step3Component } from './components/step3/step3.component';
import { Step3Guard } from './components/step3/step3.guard';
import { Step4Component } from './components/step4/step4.component';
import { Step4Guard } from './components/step4/step4.guard';
import { TableComponent } from './components/table/table.component';
import { WebSocketComponent } from './components/web-socket/web-socket.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'web' },
  { path: 'web', component: WebSocketComponent },
  { path: 'main', component: MainComponent },
  { path: 'person', component: PersonComponent },
  { path: 'table', component: TableComponent },
  {
    path: 'step',
    children: [
      { path: '1', component: Step1Component },
      { path: '2', component: Step2Component, canActivate: [Step2Guard] },
      { path: '3', component: Step3Component, canActivate: [Step3Guard] },
      { path: '4', component: Step4Component, canActivate: [Step4Guard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
