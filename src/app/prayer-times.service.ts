import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const API_BASE = 'https://api.aladhan.com/v1/timings/{{TIMESTAMP}}?latitude={{LATITUDE}}&longitude={{LONGITUDE}}&method=2';
const TIMESTAMP = '{{TIMESTAMP}}';
const LATITUDE = '{{LATITUDE}}';
const LONGITUDE = '{{LONGITUDE}}';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {

  urlGenerate$ = new Observable<string>(function (observer) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const d = '' + Math.floor((+ new Date()) / 1000);
        const url: string = API_BASE.replace(TIMESTAMP, d)
          .replace(LONGITUDE, '' + position.coords.longitude)
          .replace(LATITUDE, '' + position.coords.latitude);
          console.log(url);
        observer.next(url);
      });
    }
  });

  constructor(private http: HttpClient) { }

  get(city: string, country: string, method: number) {

    return this.urlGenerate$.pipe(switchMap(_ => this.http.get<any>(_)));
  }
}
