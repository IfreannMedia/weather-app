import { ConstructionAssigner } from '../../static utilities/construction-assigner';
import { IHasCountry } from '../interfaces/IHasCountry';

export class Country implements IHasCountry {
    public country: string = '';
    public city: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}
