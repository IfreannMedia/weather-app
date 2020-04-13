import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class Coords {
  public x: number = undefined;
  public y: number = undefined;

  constructor(args?) {
    if (!args) {
      return;
    }
    if (args.hasOwnProperty('x') && args['x']) {
      this.x = args.x
    }
    if (args.hasOwnProperty('y') && args['y']) {
      this.y = args.y
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private userLocation: BehaviorSubject<Coords> = new BehaviorSubject<Coords>(undefined);
  public userDeniedLocationServices: EventEmitter<boolean> = new EventEmitter();
  public locationServicesUnavailable: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public get userLocationObservable(): Observable<Coords> {
    return this.userLocation.asObservable();
  }

  public get userLocationValue(): Coords {
    return this.userLocation.getValue();
  }

  public getGeoLocation() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.successCallback(position);
    }, (e: PositionError) => {
      this.errorCallback(e);
    });

  }

  private successCallback(position: Position) {
    this.userLocation.next(new Coords({ x: position.coords.latitude, y: position.coords.longitude }))
  }

  private errorCallback(err: PositionError) {
    if (err.code === err.PERMISSION_DENIED) {
      this.userDeniedLocationServices.emit(true);
    }
    else if (err.code === err.POSITION_UNAVAILABLE) {
      this.locationServicesUnavailable.emit(true);
    }
    else {
      // TODO show generic location err message to user
      console.error(new Error(err.message));
    }
  }

}
