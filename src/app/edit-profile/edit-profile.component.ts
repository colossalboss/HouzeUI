import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userForm;
  user;
  userId;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private auth: AuthService, private router: Router) { 
    // this.userForm = this.formBuilder.group({
    //   name: [this.user?.name, Validators.required],
    //   email: [this.user?.email, Validators.required],
    //   image: this.user?.image,
    //   address: this.user?.address,
    //   password: [this.user?.password, Validators.required],
    //   confirmPassword: ['', Validators.required]
    // })
  }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.userId = id;
    console.log(this.userId, "userId");
    
    this.getUser(id);
    console.log(id, "id");
    
  }

  

  saveChanges(userDetails) {
    userDetails.userId = this.userId;
    
    this.auth.updateUser(userDetails);
    console.log(userDetails);
    this.router.navigate(['profile', this.user]);
  }

  getUser(id) {
    this.auth.getUserById(id).subscribe(res => {
      this.user = res;
      console.log(this.user, "user");
      this.constructForm(res);
    })
  }

  constructForm(user) {
    console.log(user, "before");

    this.userForm = this.formBuilder.group({
      name: [user?.name, Validators.required],
      email: [user?.email, Validators.required],
      image: user?.image,
      address: user?.address,
      password: [user?.password, Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

}
