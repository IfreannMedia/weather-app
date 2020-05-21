import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';

export class CountryWithFlag {
    public country: string = '';
    public flag_base64: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}