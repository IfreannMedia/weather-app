import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';
import { IHasCountry } from '../interfaces/IHasCountry';

export class CountryWithFlag implements IHasCountry {
    public country: string = '';
    public flag_base64: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}