import { WeatherContainer } from './../../classes/weather';
import { Component } from '@angular/core';

@Component({
  selector: 'weather-page',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
})
export class WeatherPage {

  public weatherContainer: WeatherContainer = undefined;

  constructor() { }

  public setWeatherContainer(w: WeatherContainer) {
    ;
    this.weatherContainer = w;
  }

}
