import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Country } from '../classes/backend-models/country';
import { CountryWithFlag } from '../classes/backend-models/country-with-flag';
import { CountryWithCoordinates } from '../classes/backend-models/country-with-coordinates';
import cities from 'node_modules/cities.json/cities.json';
import CountryData from 'node_modules/countries-list/dist/index';
import { City } from '../classes/city';
import { CountryComplete } from '../classes/country-complete';

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

  // get data from cities and country-list json files, and merge into array of CountryComplete objects
  public createCountriesModel() {
    let countriesComplete: CountryComplete[] = this.createCountries();
    this.addCitiesToCountries(countriesComplete);
  }

  // creatre array from CountryData, and populate countriesComplete array, then return it
  private createCountries(): CountryComplete[] {
    let countriesObject = CountryData.countries;
    const countriesComplete: CountryComplete[] = [];
    Object.entries(countriesObject).map((entry: [string, Country]) => {
      const cIndex: number = countriesComplete.findIndex(c => c.countryAsISO === entry[0]);
      if (cIndex > -1) {
        countriesComplete[cIndex].country = new Country(entry[1]);
      }
      else {
        const countryCoToAdd = new CountryComplete();
        countryCoToAdd.countryAsISO = entry[0];
        countryCoToAdd.country = new Country(entry[1]);
        countriesComplete.push(countryCoToAdd);
      }
    });
    return countriesComplete;
  }

  private addCitiesToCountries(countriesComplete: CountryComplete[]) {
    let citiesArray: City[] = cities as [City];
    countriesComplete.forEach((country: CountryComplete) => {
      citiesArray.filter(e => e.country.toLowerCase() === country.countryAsISO.toLowerCase()).map((city, i) => {
        country.cities.push(city);
        citiesArray.splice(i, 1);
      });
    });
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
    // this.createCompleteCountriesSorted(countries, countriesWithFlags, countriesWithCoordinates);
  }

  // private createCompleteCountriesSorted(countries: Country[], countriesWithFlags: CountryWithFlag[], countriesWithCoordinates: CountryWithCoordinates[]) {
  //   // sort each data array
  //   let countriesComplete: CountryComplete[] = [];
  //   let dataArray: [Country[], CountryWithFlag[], CountryWithCoordinates[]] = [countries, countriesWithFlags, countriesWithCoordinates];
  //   dataArray.forEach(dAr => {
  //     dAr = dAr.sort((a: IHasCountry, b: IHasCountry) => {
  //       return a.country.localeCompare(b.country);
  //     })
  //   })
  //   // create complete country element
  //   countries.forEach((country, index) => {
  //     countriesComplete[index] = new CountryComplete();
  //     countriesComplete[index].country = country;
  //     countriesComplete[index].flagAsBase64 = countriesWithFlags[index].flag_base64;
  //     countriesComplete[index].location = new Coords(countriesWithCoordinates[index]);
  //   });
  //   // emit the behavior subject
  //   this.countries = countriesComplete;
  // }
}