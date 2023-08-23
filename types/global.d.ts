
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

}

export {SessionEx, UserExtendedPart };
