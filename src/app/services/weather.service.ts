import { WeatherContainer } from './../classes/weather';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coords } from '../classes/coords';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherApiKey = '75ff775c3b4d279239fb76ccfe38befc';
  constructor(private httpClient: HttpClient) { }


  public getWeatherByLatAndLang(userLocation: Coords): Observable<WeatherContainer> {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + userLocation.x + '&lon=' + userLocation.y + '&appid=' + this.openWeatherApiKey;
    const params = new HttpParams().set('units', 'metric');
    return this.httpClient.get(url, { params }).pipe(map((r) => new WeatherContainer(r)));
  }
}
