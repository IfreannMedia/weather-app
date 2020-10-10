import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Country } from '../classes/backend-models/country';
import cities from 'node_modules/cities.json/cities.json';
import CountryData from 'node_modules/countries-list/dist/index';
import { CountryComplete } from '../classes/country-complete';
import { City } from '../classes/city';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private completeCountries: BehaviorSubject<CountryComplete[]> = new BehaviorSubject<CountryComplete[]>(undefined);

  constructor(private laodingService: LoadingService) { }

  public get countriesValue() {
    return this.completeCountries.getValue();
  }

  public get countriesObservable(): Observable<CountryComplete[]> {
    return this.completeCountries.asObservable();
  }

  public set countries(countries: CountryComplete[]) {
    this.completeCountries.next(countries);
  }

  public getCountries(): CountryComplete[] {
    return this.createCountries();
  }

  // gets already existing country objects otherwise creates and sets them
  private createCountries(): CountryComplete[] {
    if (this.countriesValue) {
      return this.countriesValue;
    }
    const countriesComplete: CountryComplete[] = [];
    Object.entries(CountryData.countries).map((entry: [string, Country]) => {
      const countryCoToAdd = new CountryComplete();
      countryCoToAdd.countryAsISO = entry[0];
      countryCoToAdd.country = new Country(entry[1]);
      countriesComplete.push(countryCoToAdd);
    });
    this.countries = countriesComplete;
    return countriesComplete;
  }

  /* gets cities for a given country by ISO string */
  public getCitiesForCountry(c: CountryComplete): Promise<City[]> {
    if (cities) {
      return this.laodingService.presentLoading().then(() => {
        let citiesArray: City[] = cities as [City];
        const returnCities = citiesArray.filter(el => el.country.toLowerCase() === c.countryAsISO.toLowerCase()).map(city => new City(city));
        this.laodingService.dismissLoading();
        return returnCities;
      });
    } else {
      console.error(new Error('no cities available'));
    }
  }
}