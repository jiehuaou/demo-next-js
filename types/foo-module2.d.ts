
/**
 * demo how to use d.ts file to declare module.
 * benifit is that jsdoc can reference types via module name like:
 * {import("foo-lib").query}, other than {import("../dir/foo-file").query}
 * 
 * "extending module" does not need to import type.
 * 
 */
declare module "foo-lib" {

    /**
     * demo FooResponse defined in deferent file
     */
    export interface FooResponse {
        id: number;
        expired: number;
        /**
         * token - string, test-name
         */
        token: string;
    }

    /**
     * demo to add custom property
     */
    export interface FooRequest {
        /**
         * new extra field
         */
        extra?: string;
    }

}
//export = {}