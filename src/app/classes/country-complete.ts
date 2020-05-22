import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';
import { Country } from './backend-models/country';
import { Coords } from './coords';
import { City } from './city';

export class CountryComplete {
    public country: Country = new Country();
    public countryAsISO: string = '' // ISO 3166-1 alpha-2 country code
    public cities: City[] = []

    constructor() {
    }

    public get captitalCoords(): Coords {
        if (this.country && this.cities && this.cities.length > 0) {
            const co = this.cities.find(c => c.name.toLowerCase() === this.country.capital.toLowerCase());
            return new Coords({ x: Number(co.lat), y: Number(co.lng) })
        }
    }
}