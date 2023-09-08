import { type MyContact, type MyIdentity, type greetFunction } from "./other";
import { DefaultSession  } from "next-auth";


/**
 * define global types which are used in other files without importing.
 */

declare global {

    /**
     * generic Error Type
     */
    interface ErrorType {
        /**
         * get error message
         */
        toString(): string;
    }

    /**
     * Fake SessionEx
     */
    interface SessionEx {
        email: string;
        role: string;
        accessToken: string;
        extra?: string;
    }

    interface UserExtendedPart {
        role?: string;
        accessToken?: string;
        refreshToken?: string;
        tokenExpireAt?: number;
        [key: string]: any
    }

    interface World {
        target: string;
    }
    interface HelloEx {
        action: string;
        world: World;
    }
    interface World {
        title: string;
    }

    /**
     * "Declaration merging" allows you to extend existing interface 
     * with additional properties as following:
     *   
     * interface HelloEx {
     *      action: string;
     *      where: string;
     *      world: {
     *         target: string;
     *         title: string;
     *     }
     * }
     * 
     */
    interface HelloEx {
        where: string;
    }

    function talk(param: HelloEx): HelloEx;


    // -----------------------------------
    // make local types globally accessible

    type MyIdentity2 = MyIdentity;
    type MyContact2 = MyContact;
    type greetFunc = greetFunction;
    // -----------------------------------

}


// extend 'next-auth'.Session with new custom Property ‘counter’.
declare module "next-auth" {
    interface Session extends DefaultSession{
        /**
         * custom counter
         */
        counter?: number;
        user?: DefaultSession['user'] & {
            /**
             * custom role property
             */
            role?: string | null
            sub?: string | null
        }
    }

}


export { };
