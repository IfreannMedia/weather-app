import { skipWhile, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { CountryService } from 'src/app/services/country.service';
import { CountryComplete } from 'src/app/classes/country-complete';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})

export class TitleSectionComponent implements OnInit {

  public countries: CountryComplete[] = []
  private subscriptions: Subscription[] = [];

  constructor(private geoLocationService: GeolocationService,
    private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
    this.collectCountryDataAndCreateModel();

    this.subscriptions.push(this.countryService.countriesObservable
      .pipe(skipWhile(val => !val)).pipe(take(1))
      .subscribe((countries: CountryComplete[]) => {
        this.countries = countries;
      }));
  }

  private collectCountryDataAndCreateModel() {
    this.countryService.createCountriesModel();
  }

}
