import { ISearchableEntry } from '../interfaces/ISearchableEntry.interface';
import { ConstructionAssigner } from './../static utilities/construction-assigner';
// object from cities.json
export class City implements ISearchableEntry {
    public country: string = ''; // this iso abbreviation example AD or FI 
    public name: string = '';
    public lat: string = '';
    public lng: string = '';

    constructor(args?) {
        if (args) {
            ConstructionAssigner.assignProperties(this, args);
        }
    }

    public getDisplayName(): string {
        return this.name;
    }

    public getComparer(): string {
        return this.name;
    }
}