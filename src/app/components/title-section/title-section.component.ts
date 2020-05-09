import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { CountryService } from 'src/app/services/country.service';
import { CountryComplete } from 'src/app/classes/country-complete';
import { Country } from 'src/app/classes/backend-models/country';
import { zip } from 'rxjs';
import { CountryWithFlag } from 'src/app/classes/backend-models/country-with-flag';
import { CountryWithCoordinates } from 'src/app/classes/backend-models/country-with-coordinates';

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

    // collect country and location data to populate searchable list:
    zip(this.countryService.getCountriesAndCapitals(),
    this.countryService.getCountriesFlagsAsBase64(),
    this.countryService.getGeocoordinatesOfConutries()).toPromise().then((data: [Country[], CountryWithFlag[], CountryWithCoordinates[]]) => {
        this.countryService.createModelFromData(data[0], data[1], data[2]);
    });
  }

}
