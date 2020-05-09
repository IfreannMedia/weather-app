export class ConstructionAssigner {
    // loops through properties of object args and if objectToAssignTo has them they are assigned
    public static assignProperties(objectToAssignTo: object, args: object) {
        Object.keys(args).forEach((argumentKey: string) => {
            if (objectToAssignTo.hasOwnProperty(argumentKey) && args[argumentKey]) {
                objectToAssignTo[argumentKey] = args[argumentKey];
            }
        });
    }
}