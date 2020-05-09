import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  // country data provided in JSON by: https://github.com/samayo/country-json
  public getCountriesAndCapitals(): Observable<any> {
    const url = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
    return this.httpClient.get(url, {});
  }

  public getGeocoordinatesOfConutries(): Observable<any> {
    const url = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-geo-coordinates.json';
    return this.httpClient.get(url, {});
  }

  public getCountriesFlagsAsBase64(): Observable<any> {
    const url = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-flag.json';
    return this.httpClient.get(url, {});
  }
}