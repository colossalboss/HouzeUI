import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm;
  public token

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      imageUrl: '',
      address: ''
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['home']);
    }

  }

  onSubmit(data) {
    console.log(data);
    this.auth.register(data);
  }

}
