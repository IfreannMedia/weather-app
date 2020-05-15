import { IHasCountry } from './../classes/interfaces/IHasCountry';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CountryComplete } from '../classes/country-complete';
import { Country } from '../classes/backend-models/country';
import { CountryWithFlag } from '../classes/backend-models/country-with-flag';
import { CountryWithCoordinates } from '../classes/backend-models/country-with-coordinates';
import { Coords } from '../classes/coords';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private completeCountries: BehaviorSubject<CountryComplete[]> = new BehaviorSubject<CountryComplete[]>(undefined);
  constructor(private httpClient: HttpClient) { }

  public get countriesValue() {
    return this.completeCountries.getValue();
  }

  public get countriesObservable(): Observable<CountryComplete[]> {
    return this.completeCountries.asObservable();
  }

  public set countries(countries: CountryComplete[]) {
    this.completeCountries.next(countries);
  }


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

  public createModelFromData(countries: Country[], countriesWithFlags: CountryWithFlag[], countriesWithCoordinates: CountryWithCoordinates[]) {
    this.createCompleteCountriesSorted(countries, countriesWithFlags, countriesWithCoordinates);
  }

  private createCompleteCountriesSorted(countries: Country[], countriesWithFlags: CountryWithFlag[], countriesWithCoordinates: CountryWithCoordinates[]) {
    // sort each data array
    let countriesComplete: CountryComplete[] = [];
    let dataArray: [Country[], CountryWithFlag[], CountryWithCoordinates[]] = [countries, countriesWithFlags, countriesWithCoordinates];
    dataArray.forEach(dAr => {
      dAr = dAr.sort((a: IHasCountry, b: IHasCountry) => {
        return a.country.localeCompare(b.country);
      })
    })
    // create complete country element
    countries.forEach((country, index) => {
      countriesComplete[index] = new CountryComplete();
      countriesComplete[index].country = country;
      countriesComplete[index].flagAsBase64 = countriesWithFlags[index].flag_base64;
      countriesComplete[index].location = new Coords(countriesWithCoordinates[index]);
    });
    // emit the behavior subject
    this.countries = countriesComplete;
  }
}