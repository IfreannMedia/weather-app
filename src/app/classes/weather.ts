import { ConstructionAssigner } from '../static utilities/construction-assigner';

export class WeatherContainer {

    public lat: number = undefined;
    public lon: number = undefined;
    public timezone: string = undefined;
    public timezone_offset: number = undefined;
    public current: Current = undefined;
    public minutely: Minutely[] = [];
    public hourly: Hourly[] = [];
    public daily: Daily[] = [];

    constructor(args: any) {
        ConstructionAssigner.assignProperties(this, args);
        if (args.current) {
            this.current = new Current(args.current);
        }
    }
}


export class Weather {
    public id: number = undefined;
    public main: string = undefined;
    public description: string = undefined;
    public icon: string = undefined;
    public get iconUrl(): string {
        return 'http://openweathermap.org/img/wn/' + this.icon + '@2x.png';
    }
}

export class Rain {
    private _value: number;
    public set value(v: number) {
        this._value = v;
    }
    public get value(): number {
        return this._value;
    }
}

export class Current {
    public dt: number = undefined;
    public sunrise: number = undefined;
    public sunset: number = undefined;
    public temp: number = undefined;
    public feels_like: number = undefined;
    public pressure: number = undefined;
    public humidity: number = undefined;
    public dew_point: number = undefined;
    public uvi: number = undefined;
    public clouds: number = undefined;
    public visibility: number = undefined;
    public wind_speed: number = undefined;
    public wind_deg: number = undefined;
    public weather: Weather[] = [];
    public rain: Rain = undefined;

    private readonly compassDirections: string[] = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    public get windDirection(): string {
        // get remainder of meteorological degrees / 360
        let index = this.wind_deg % 360;
        // get array index by rounding the remainder divided by 22.5(360/16) and adding 1
        index = Math.round(index / 22.5) + 1;
        return this.compassDirections[index];

    }

    constructor(args: any) {
        ConstructionAssigner.assignProperties(this, args);
        ;
    }
}

export interface Minutely {
    dt: number;
    precipitation: number;
}

export interface Weather2 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather2[];
    pop: number;
    rain: Rain;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Weather3 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather3[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
}
