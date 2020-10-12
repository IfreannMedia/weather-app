import { WeatherContainer } from 'src/app/classes/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Coords } from 'src/app/classes/coords';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  private subscruptions: Subscription[] = [];
  private _weatherContainer: WeatherContainer = undefined;
  @Input() public set weatherContainer(w: WeatherContainer) {
    if (!w) {
      return;
    }
    this._weatherContainer = w;
  }

  public get weatherContainer(): WeatherContainer {
    return this._weatherContainer;
  }


  constructor(private weatherService: WeatherService,
    private geoLocationService: GeolocationService) { }

  ngOnInit(): void {
    this.getWeatherForUsersLocation();
    this.subscribeToLocationServiceUnavailable();
    this.subscribeToPermissionDeneid();
  }

  ngOnDestroy(): void {
    this.subscruptions.forEach(sub => sub.unsubscribe);
  }

  public subscribeToLocationServiceUnavailable() {
    this.subscruptions.push(this.geoLocationService.locationServicesUnavailable.subscribe((unavailable: boolean) => {
      if (unavailable) {
        // TODO display message to user
        console.error(new Error('location service unavailable'));
      }
    }));
  }

  public subscribeToPermissionDeneid() {
    this.subscruptions.push(this.geoLocationService.userDeniedLocationServices.subscribe((deneidPermission: boolean) => {
      if (deneidPermission) {
        // TODO handle user denying permission
        console.error(new Error('user deneid permission'));
      }
    }));
  }

  private getWeatherForUsersLocation() {
    this.geoLocationService.getGeoLocation().then((pos: Position) => {
      this.weatherService.getWeatherByLatAndLang(new Coords({ x: pos.coords.latitude, y: pos.coords.longitude })).toPromise().then((w: WeatherContainer) => {
        this.weatherContainer = w;
      })
    });
  }

}
