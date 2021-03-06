import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials;

  constructor(private formBuilder: FormBuilder, public auth: AuthService, private router: Router) { 
    this.credentials = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(data) {
    console.log(data);
  }

}
