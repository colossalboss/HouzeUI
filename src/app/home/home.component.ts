import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  houses;
  searchForm;
  original;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    // this.getHouses();
    this.auth.getHouses().subscribe(res => {
      this.houses = res;
      this.original = res;
      console.log(this.houses)
    });
  }

  getHouses() {
    // this.auth.getHouses().subscribe(res => {
    //   this.houses = res
    //   console.log(this.houses)
    // });
  }

  onSelect(id) {
    console.log(id)
    this.router.navigate(['house', id]);
  }

  onSearch(obj) {
    console.log(obj)
    // this.onChange(obj);
    let arr = [];
    if (obj.searchText) {
      console.log(this.houses)
      console.log("true")

      this.original.forEach(element => {
        if (element.type.toLowerCase().includes(obj.searchText) || element.school.toLowerCase().includes(obj.searchText)) {
          arr.push(element);
        }
      });
      this.houses = arr;
    } else {
      console.log(this.original, "original")
      this.houses = this.original;
    }
  }

}
