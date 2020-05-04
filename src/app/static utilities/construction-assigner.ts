export class ConstructionAssigner {
    public static assignProperties(objectToAssignTo: object, ...args: any[]) {
        Object.keys(args).forEach((argumentKey: string) => {
            if (objectToAssignTo.hasOwnProperty(argumentKey) && objectToAssignTo[argumentKey]) {
                objectToAssignTo[argumentKey] = args[argumentKey];
            }
        });
    }
}