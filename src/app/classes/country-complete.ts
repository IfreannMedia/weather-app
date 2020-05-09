import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';
import { Country } from './backend-models/country';
import { Coords } from './coords';

export class CountryComplete {
    public country: Country = new Country();
    public location: Coords = new Coords();
    public flagAsBase64: string = '';

    constructor() {
    }
}