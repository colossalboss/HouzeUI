import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import { StatsService } from '../stats.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  errorMessage: string;
  
  title = 'Dummy data of Naruto sales in the last 6 years ';
  type = 'PieChart';
  data = [
    ['2013', 40.0],
    ['2014', 56.8],
    ['2015', 42.8],
    ['2016', 38.5],
    ['2017', 30.2],
    ['2018', 46.7]
 ];
 columnNames = ['Type', 'Likes'];
  options = {
  };
  width = 550;
  height = 400;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(res => this.auth.loggedUser(res));

    // this.statsService.GetNarutoStatistics().subscribe(
    //   result => {
    //     // clear up the database so it doesn't keep pushing unwanted data into it.
    //     this.data = [];
    //     // change the title
    //     this.title = 'Database data of House likes';
    //     // change the type
    //     this.type = 'ColumnChart';
    //     console.log(result);

    //     result.forEach(itm => {
    //       this.data.push([itm.houseType, itm.numberOfLikes]);
    //     });


    //     // push in the data foreach result year and sales.
    //     // I used the .toString method because the x-axis has to be in string format.
    //     // for (let data in result.narutoStats ) {
    //     //   this.data.push([result.narutoStats[data].year.toString(), result.narutoStats[data].salesInMillion]);
    //     // }
        
    //   },
    //   error => {
    //     console.log(error, "something went wrong");
    //   }
    // );
  }

}
