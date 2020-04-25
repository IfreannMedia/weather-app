import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WeatherService } from 'src/app/services/weather.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})

export class TitleSectionComponent implements OnInit {

  constructor(private geoLocationService: GeolocationService,
    private countryService: CountryService) { }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
    // TODO CREATE MODELS FOR COUNTRIES AND CONVERT THE BASE64 IMAGES into icons to show in a searchbar
    this.countryService.getCountriesAndCapitals().subscribe((result) => {
      console.log("getCountriesAndCapitals")
      console.log(result);
      let countries = new CountriesAndCapitals();
      countries.countries = result
    });

    this.countryService.getCountriesFlagsAsBase64().subscribe((result) => {
      console.log("getCountriesFlagsAsBase64")
      console.log(result);
    });

    this.countryService.getGeocoordinatesOfConutries().subscribe((result) => {
      console.log("getGeocoordinatesOfConutries")
      console.log(result);
    });
  }

}

export class CountriesAndCapitals {
  public countries: [{ country: string, capital: string }];
}
