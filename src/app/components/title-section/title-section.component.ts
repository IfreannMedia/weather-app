import { skipWhile, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { CountryService } from 'src/app/services/country.service';
import { CountryComplete } from 'src/app/classes/country-complete';
import { Subscription } from 'rxjs';
import { City } from 'src/app/classes/city';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})

export class TitleSectionComponent implements OnInit {

  public entries: City[] = [];
  public countries: CountryComplete[] = [];
  public chosenCountry: CountryComplete = undefined;
  public cities: City[] = [];
  public chosenCity: City = undefined;

  constructor(private geoLocationService: GeolocationService,
    private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
    this.countries = this.countryService.getCountries();
  }

  public countrySelected(c: CountryComplete) {
    this.chosenCountry = c;
    this.countryService.getCitiesForCountry(c).then((cities: City[]) => {
      this.cities = cities;
    });
  }

  public citySelected(c: City) {
    // TODO get weather for city and display
  }
}
