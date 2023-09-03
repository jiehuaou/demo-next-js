
/**
 * demo how to use d.ts file to declare module.
 * 
 * benifit is that jsdoc can reference types via module name like:
 * {import("foo-lib").query}, other than {import("../dir/foo-file").query}
 * 
 */
declare module "foo-lib" {

    export interface FooRequest {
        id: number;
        name: string;
    }

    // export interface FooResponse {
    //     id: number;
    //     expired: number;
    //     token: string;
    // }

    /**
     * create token for the given user
     */
    export function query(request: FooRequest) : FooResponse;

    //export = query;

}
//export = {}