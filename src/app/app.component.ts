import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = 'Houze';
  house;
  user;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  onPost() {
    const obj = {
      type: "flat"
    }

    this.auth.postHouse(obj).subscribe(res => {
      this.house = res;
      console.log(this.house)
    });
    
  }

  getUser() {
    this.auth.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      
    })
  }
}
