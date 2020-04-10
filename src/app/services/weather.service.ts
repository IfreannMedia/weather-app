import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherApiKey = '75ff775c3b4d279239fb76ccfe38befc';

  constructor(private httpClient: HttpClient) { }


  public getWeatherByLatAndLang(lat: number, lon: number): Observable<any> {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + this.openWeatherApiKey;
    return this.httpClient.get(url, {});
  }
}
