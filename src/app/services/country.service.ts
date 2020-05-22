import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Country } from '../classes/backend-models/country';
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
    this.countries = countriesComplete;
  }

  // creatre array from CountryData, and populate countriesComplete array, then return it
  private createCountries(): CountryComplete[] {
    const countriesComplete: CountryComplete[] = [];
    Object.entries(CountryData.countries).map((entry: [string, Country]) => {
      const countryCoToAdd = new CountryComplete();
      countryCoToAdd.countryAsISO = entry[0];
      countryCoToAdd.country = new Country(entry[1]);
      countriesComplete.push(countryCoToAdd);
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
}