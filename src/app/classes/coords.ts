import { ConstructionAssigner } from 'src/app/static utilities/construction-assigner';
export class Coords {
    public x: number = undefined;
    public y: number = undefined;

    private north: number = undefined;
    private south: number = undefined;
    private east: number = undefined;
    private west: number = undefined;

    constructor(args?) {
        if (!args) {
            return;
        }
        ConstructionAssigner.assignProperties(this, args);
    }
}