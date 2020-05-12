import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  house;
  savedHouse;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { 
    this.house = this.formBuilder.group({
      image: ['', Validators.required],
      school: '',
      address: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe(res => this.auth.loggedUser(res));
  }

  onPost(houseDetails) {
    console.log(houseDetails);
    this.auth.postHouse(houseDetails).subscribe(res => {
      if (res) {
        this.savedHouse = res;
        this.router.navigate(['home']);
      }
    });
  }

}
