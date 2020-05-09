import { WeatherService } from 'src/app/services/weather.service';
import { GeolocationService, Coords } from 'src/app/services/geolocation.service';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators'
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  private subscruptions: Subscription[] = [];


  constructor(private weatherService: WeatherService,
    private geoLocationService: GeolocationService) { }

  ngOnInit(): void {
    this.subscribeToUserLocation();
    this.subscribeToUserPermission();
    this.subscribeToLocationServiceAvailable();
  }

  ngOnDestroy(): void {
    this.subscruptions.forEach(sub => sub.unsubscribe);
  }

  public subscribeToLocationServiceAvailable() {
    this.subscruptions.push(this.geoLocationService.locationServicesUnavailable.subscribe((unavailable: boolean) => {
      if (unavailable) {
        // TODO display message to user
        console.error(new Error('location service unavailable'));
      }
    }));
  }

  public subscribeToUserPermission() {
    this.subscruptions.push(this.geoLocationService.userDeniedLocationServices.subscribe((deneidPermission: boolean) => {
      if (deneidPermission) {
        // TODO handle user denying permission
        console.error(new Error('user deneid permission'));
      }
    }));
  }

  public subscribeToUserLocation() {
    this.subscruptions.push(this.geoLocationService.userLocationObservable.pipe(skipWhile(val => !val)).subscribe((userCoordinates: Coords) => {
      this.getWeatherDataForCoords(userCoordinates);
    }));
  }

  private getWeatherDataForCoords(coords: Coords) {
    this.weatherService.getWeatherByLatAndLang(coords).subscribe((data) => {
      console.log('got API data');
      console.log(JSON.stringify(data));
    }, (e) => {
      console.error(new Error('weatherService.getWeatherTest failed: ' + JSON.stringify(e)));
    })
  }


}
