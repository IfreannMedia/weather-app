import { ConstructionAssigner } from './../static utilities/construction-assigner';
// object from cities.json
export class City {
    public country: string = ''; // this iso abbreviation example AD or FI 
    public name: string = '';
    public lat: string = '';
    public lng: string = '';

    constructor(args?) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }
}