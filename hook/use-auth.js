import { useRouter } from "next/router";


const buildLoginUrl = (path, callbackUrl) => {
    const params = new URLSearchParams();
    params.append('callbackUrl', callbackUrl);
    return `${path}?${params.toString()}`;
}

/**
 * Checks the user's authentication status and redirects them to the sign-in page if not authenticated.
 *
 * @param {string} status - The authentication status of the user.
 */
const useAuth = (status) => {
    const router = useRouter();
    if (status === 'unauthenticated') {
        
        const callbackUrl = router.pathname;
        const url = buildLoginUrl('/auth/sign-in', callbackUrl);
        console.log(`[useAuth] redirect to ${url}`);
        router.push(url);
    }
    
}

export default useAuth;