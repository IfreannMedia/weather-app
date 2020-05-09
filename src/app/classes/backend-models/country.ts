import { ConstructionAssigner } from '../../static utilities/construction-assigner';

export class Country {
    public country: string = '';
    public city: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}
