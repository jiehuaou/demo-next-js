
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
    }

}

export { };
