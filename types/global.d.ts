
/**
 * define global types which are used in other files without importing.
 */

declare global {
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
     * Declaration merging allows you to extend existing interface 
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

    function talk (param: HelloEx) : HelloEx ;

}

export {};
