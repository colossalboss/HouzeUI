import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  houses;
  user;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    console.log(id, "id");

    this.getUserDetails(id);
    this.getHouses(id);
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

  edit(id) {
    this.router.navigate(['/edit', this.user.id]);
  }

}
