import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  people: Person[];
  person = new Person();

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
    // this.refreshPeople();
  }

  // refreshPeople() {
  //   this.apiService.getPeople()
  //     .subscribe(data => {
  //       console.log(data)
  //       this.people = data;
  //     });

  // }

  // addPerson() {
  //   this.apiService.addPerson(this.person).then(data => {
  //     console.log(data)
  //     this.refreshPeople();
  //   }).catch(error => {
  //     console.error('Custom error: ', error);
  //   })
  // }

}
