import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.testWeatherDataForMunich();
  }

  private testWeatherDataForMunich() {
    this.weatherService.getWeatherByLatAndLang(48.13333, 11.56667).subscribe((data) => {
      console.log('got API data');
      console.log(JSON.stringify(data));
    }, (e) => {
      console.error(new Error('weatherService.getWeatherTest failed: ' + JSON.stringify(e)));
    })
  }

}
