import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { CountryService } from 'src/app/services/country.service';
import { CountryComplete } from 'src/app/classes/country-complete';
import { Country } from 'src/app/classes/backend-models/country';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})

export class TitleSectionComponent implements OnInit {

  private countries: CountryComplete[] = []


  constructor(private geoLocationService: GeolocationService,
    private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
    // TODO CREATE MODELS FOR COUNTRIES AND CONVERT THE BASE64 IMAGES into icons to show in a searchbar
    this.countryService.getCountriesAndCapitals().subscribe((result: Country[]) => {
      console.log("getCountriesAndCapitals")
      console.log(result);
      console.log(typeof result);
      result.forEach((c, i) => this.countries[i] = new CountryComplete(c));
      console.log(this.countries);
      debugger;
      // let countries = new CountriesAndCapitals();
      // countries.countries = result
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
