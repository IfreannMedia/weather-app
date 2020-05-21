import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';
import { Country } from './backend-models/country';
import { Coords } from './coords';
import { City } from './city';

export class CountryComplete {
    public country: Country = new Country();
    public countryAsISO: string = '' // ISO 3166-1 alpha-2 country code
    public cities: City[] = []
    public location: Coords = new Coords();
    public flagAsBase64: string = '';

    constructor() {
    }
}