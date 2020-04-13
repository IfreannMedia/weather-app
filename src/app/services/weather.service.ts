import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coords } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherApiKey = '75ff775c3b4d279239fb76ccfe38befc';

  constructor(private httpClient: HttpClient) { }


  public getWeatherByLatAndLang(userLocation: Coords): Observable<any> {
      // return of();
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + userLocation.x + '&lon=' + userLocation.y + '&appid=' + this.openWeatherApiKey;
    return this.httpClient.get(url, {});
  }
}
