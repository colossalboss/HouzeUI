import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('liked', style({
        fontSize: '30px',
        opacity: 1,
        color: 'red'
      })),
      state('normal', style({
        fontSize: '25px',
        opacity: 0.5,
        color: '#fff'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class HouseDetailsComponent implements OnInit {

  house;
  commentForm;
  selectedHouse;
  justNowComment;
  comments;
  public likes?;
  user;
  recentlyLiked;
  liked =  false;
  editable;

  constructor(private route: ActivatedRoute, private auth: AuthService, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required],
    })
   }

  ngOnInit(): void {

    this.auth.getUser().subscribe(res => this.auth.loggedUser(res));

    let id = this.route.snapshot.params.id;
    this.selectedHouse = id;
    console.log(id, "id")

    this.auth.getHouseById(id).subscribe(res => {
      this.house = res;
      console.log(this.house);
      this.buttonCheck(this.house.appUserId);
    })

    this.getComments(id);

    this.auth.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user, "user");
    })

    this.getLikes(id);
    
  }

  onComment(comment) {
    comment.houseId = +this.selectedHouse;
    console.log(this.comments);
    this.auth.postComment(comment).subscribe(res => this.justNowComment = res);
    this.comments.push(comment);
    this.getComments(comment.houseId);
    this.commentForm.reset();
  }

  getComments(id) {
    this.auth.getComments(id).subscribe(res => {
      this.comments = res;
      console.log(res);
    });
  }

  onLike(id) {
    let likeObj = {
      houseId: +id,
    }
    this.getLikes(id);
    this.auth.like(likeObj).subscribe(res => {
      this.recentlyLiked = res;
      if (res.liked === true) {
        this.likes.push(this.recentlyLiked);
        this.liked = true;
      } else {
        this.likes.pop();
        this.liked = false;
      }
    });
  }

  getLikes(id) {
    this.auth.getHouselikes(+id).subscribe(res => {
      this.likes = res;
    })
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
