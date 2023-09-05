
/**
 * demo how to use d.ts file to declare module.
 * 
 * benifit is that jsdoc can reference types via module name like:
 * {import("foo-lib").query}, other than {import("../dir/foo-file").query}
 * 
 */
declare module "foo-lib" {

    export interface FooRequest {
        /**
         * request id
         */
        id: number;
        name: string;
    }

    // export interface FooResponse {
    //     id: number;
    //     expired: number;
    //     token: string;
    // }

    /**
     * create token for the given user, function merge
     * (request: FooRequest | string) : FooResponse;
     */
    export function query(request: FooRequest): FooResponse;
    export function query(request: string): FooResponse;

    // export interface query {
    //     (request: FooRequest) : FooResponse;
    //     (request: string) :FooResponse;
    // }

    const data: FooRequest = {
        id: 1,
        name: "hello",
        extra: "extra" // this field is defined in different file.
    }

}


let data : import("foo-lib").FooRequest = {
    id: 1,
    name: "hello",
    extra: "extra" // this field is defined in different file.
}

//export = {}