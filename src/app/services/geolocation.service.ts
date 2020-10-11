import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coords } from '../classes/coords';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private _userLocation: BehaviorSubject<Coords> = new BehaviorSubject<Coords>(undefined);
  public userDeniedLocationServices: EventEmitter<boolean> = new EventEmitter();
  public locationServicesUnavailable: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public get userLocationObservable(): Observable<Coords> {
    return this._userLocation.asObservable();
  }

  public get userLocationValue(): Coords {
    return this._userLocation.getValue();
  }

  private set userLocation(position: Position) {
    this._userLocation.next(new Coords({ x: position.coords.latitude, y: position.coords.longitude }))
  }

  public getGeoLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition((position: Position) => {
        this.userLocation = position;
        resolve(position);
      }, (e: PositionError) => {
        // TODO display feedback to user
        this.handleUserLocError(e);
        reject(e);
      });
    });
  }


  private handleUserLocError(err: PositionError) {
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
