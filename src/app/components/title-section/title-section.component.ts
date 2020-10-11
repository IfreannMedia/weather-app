import { Coords } from 'src/app/classes/coords';
import { WeatherService } from 'src/app/services/weather.service';
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
    private countryService: CountryService,
    private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
    this.countries = this.countryService.getCountries();
  }

  public countrySelected(c: CountryComplete) {
    if (this.chosenCountry && this.chosenCountry.countryAsISO === c.countryAsISO) {
      return;
    }
    this.chosenCountry = c;
    this.countryService.getCitiesForCountry(c).then((cities: City[]) => {
      this.cities = cities;
    });
  }

  public citySelected(c: City) {
    this.weatherService.getWeatherByLatAndLang(new Coords({ x: c.lat, y: c.lng })).toPromise().then((d: any) => {
      // TODO Display retrieved weather data
    });
  }

  public getUserLocationWeather() {
    this.geoLocationService.getGeoLocation().then((pos: Position) => {
      this.weatherService.getWeatherByLatAndLang(new Coords({ x: pos.coords.latitude, y: pos.coords.longitude })).toPromise().then((wData) => {
        // TODO Display retrieved weather data
      });
    }).catch((err) => {
      // TODO Display appropriate error message to user
      console.error(new Error(err));
    });
  }
}
