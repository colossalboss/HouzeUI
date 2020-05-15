import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit {

  houseForm;
  imageUrl;
  houseToEdit;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private auth: AuthService,
              private router: Router) { 
    this.houseForm = this.formBuilder.group({
      type: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      school: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    this.getHouse(id);

  }

  constructForm(house) {
    console.log(house, "before");

    this.houseForm = this.formBuilder.group({
      type: [house?.type, Validators.required],
      phone: [house?.phone, Validators.required],
      image: [house?.image, Validators.required],
      address: [house?.address, Validators.required],
      school: [house?.school, Validators.required],
      description: [house?.description, Validators.required]
    })
    this.imageUrl = house.image;
  }

  getHouse(id) {
    this.auth.getHouseById(id).subscribe(res => {
      this.houseToEdit = res;
      this.constructForm(res);
    })
  }

  saveChanges(updatedForm) {
    updatedForm.id = this.houseToEdit.id;
    this.auth.updateHouse(updatedForm);
    console.log(updatedForm);

    // this.router.navigate(['house', updatedForm.id]);
  }

}
