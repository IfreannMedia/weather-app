import { ConstructionAssigner } from '../../static utilities/construction-assigner';

// holds some properties from countries-list node module
export class Country {
    public name: string = '';
    public native: string = '';
    public continent: string = '';
    public capital: string = '';
    public emoji: string = '';
    public emojiU: string = '';

    constructor(args?: any) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

}
