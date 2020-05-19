import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  private houseStatisticsUrl = '/api/houses/stats';



  GetNarutoStatistics() {
    // return this.http.get<any>(this.houseStatisticsUrl).pipe(
    return this.http.get<any>("https://houze-api-7375.herokuapp.com/api/houses/stats").pipe(
    map( result => {
      console.log(result);
      return result;
    })
    );
  }
}
