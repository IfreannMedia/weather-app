import { Country } from './backend-models/country';
import { Coords } from '../services/geolocation.service';

export class CountryComplete {
    public country: Country = new Country();
    public location: Coords = new Coords();
    public flagAsBase64: string = '';

    constructor(args?: any) {
        if (!args) {
            return;
        }
        if (args.hasOwnProperty('country') && args['country']) {
            this.country.country = args.country
        }
        if (args.hasOwnProperty('city') && args['city']) {
            this.country.city = args.city
        }
    }
}