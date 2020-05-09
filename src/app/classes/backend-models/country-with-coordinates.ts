import { IHasCountry } from './../interfaces/IHasCountry';
import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';

export class CountryWithCoordinates implements IHasCountry {

    public country: string = '';
    public east: string = '';
    public north: string = '';
    public south: string = '';
    public west: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}