import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  houses;
  user;
  loggedUserId;
  editable;
  profileOwner;
  profileViewer;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.loggedUserId = id;
    console.log(id, "id");

    this.getUserDetails(id);
    this.getHouses(id);

    this.buttonCheck(id);

  }

  getHouses(id) {
    this.auth.getUserHouses(id).subscribe(res => {
      this.houses = res;
      console.log(this.houses, "userHouses");
    })
  }

  getUserDetails(id) {
    this.auth.getUserById(id).subscribe(res => {
      this.user = res;
      console.log(this.user, "user")
    })
  }

  onSelect(id) {
    console.log(id)
    this.router.navigate(['house', id]);
  }

  edit() {
    this.router.navigate(['/edit', this.loggedUserId]);
  }

  buttonCheck(id) {
    this.auth.getUserById(id).subscribe(res => {
      let profileOwner: any = res;
      this.auth.getUser().subscribe( res => {
        let profileViewer: any = res;
        console.log(profileOwner.userId, profileViewer.userId)
        if (profileOwner.userId === profileViewer.userId) {
          this.editable = true;
        } else {
          this.editable = false;
        }
      });

    });
  }

}
