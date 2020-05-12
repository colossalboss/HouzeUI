import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  result: string;

  get isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  register(userDetails) {
    this.http.post<any>("https://houze-api-7375.herokuapp.com/api/account", userDetails).subscribe( res => this.authenticate(res));
    // this.http.post<any>("/api/account", userDetails).subscribe( res => this.authenticate(res));
  }

  login(credentials) {
    this.http.post<any>("https://houze-api-7375.herokuapp.com/api/account/login", credentials).subscribe( res => this.authenticate(res));
    // this.http.post<any>("/api/account/login", credentials).subscribe( res => this.authenticate(res));
  }

  postHouse(obj) {
    console.log(obj)
    // return this.http.post("/api/houses", obj);
    return this.http.post("https://houze-api-7375.herokuapp.com/api/houses", obj);
  }

  authenticate(res) {
    localStorage.setItem("token", res.tkn);

    this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem("token");

    this.router.navigate(['login']);
  }

  getHouses() {
    return this.http.get("https://houze-api-7375.herokuapp.com/api/houses");
    // return this.http.get("/api/houses");
  }

  getHouseById(id) {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/houses/${id}`);
    // return this.http.get(`/api/houses/${id}`);
  }

  getHouselikes(houseId) {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/likes/${houseId}`);
    // return this.http.get(`/api/likes/${houseId}`);
  }

  postComment(comment) {
    return this.http.post<any>("https://houze-api-7375.herokuapp.com/api/comments", comment);
    // return this.http.post<any>("/api/comments", comment);
  }

  getComments(id) {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/comments/${id}`);
    // return this.http.get(`/api/comments/${id}`);
  }

  like(obj) {
    return this.http.post<any>("https://houze-api-7375.herokuapp.com/api/likes", obj);
    // return this.http.post<any>("/api/likes", obj);
  }

  unlike(id) {
    console.log(typeof id)
    this.http.delete(`https://houze-api-7375.herokuapp.com/api/likes/${id}`).subscribe(res => {
    // this.http.delete(`/api/likes/${id}`).subscribe(res => {
      console.log(res);
    })
  }

  getUser() {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/users/`);
    // return this.http.get(`/api/users/`);
  }

  getUserHouses(id) {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/users/userhouses/${id}`);
    // return this.http.get(`/api/users/userhouses/${id}`);
  }

  getUserById(userId) {
    return this.http.get(`https://houze-api-7375.herokuapp.com/api/users/${userId}`);
    // return this.http.get(`/api/users/${userId}`);
  }

  updateUser(user) {
    this.http.put(`https://houze-api-7375.herokuapp.com/api/users/${user.id}`, user).subscribe(res => console.log(res));
    // this.http.put(`/api/users/${user.id}`, user).subscribe(res => console.log(res));
  }
}
