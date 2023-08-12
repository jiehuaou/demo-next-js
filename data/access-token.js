// import jwt from "jsonwebtoken";
import {jwtVerify, SignJWT, JWTPayload, JWTVerifyResult} from 'jose';

const secret = process.env.SECRET_TEXT;

const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJoZWxsb0Bjb21wYW55LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTkxODIzOTAyMiwiZXhwIjoxOTE4MjM5MDIyfQ.X24Qljc7h2FdlNQY2kYm7SqNTH1YxiucwIJzhe3FAc4";

/**
 * Creates a token for the given user.
 *
 * @param {JWTPayload} user - The user object.
 * @return {string} The generated token.
 */
const createFakeToken = function(user) {
    return fakeToken;
}


/**
 * Creates a token for the given user.
 *
 * @param {JWTPayload} user - The user object.
 * @return {Promise<string>} The generated token.
 */
const createToken = async function(user, duration = 20, issuedAt = 0) {
    // const secret = process.env.SECRET_TEXT;
    let iat = issuedAt || Math.floor(Date.now() / 1000) ;
    let exp = iat + (duration * 60);
    const {accessToken, refreshToken, ...payload} = user;
    const jwt = new SignJWT({payload})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat);
    return jwt.sign(new TextEncoder().encode(secret));
}

/**
 * verify a token.
 *
 * @param {string} token
 * @return {Promise<JWTVerifyResult>} 
 */
const verifyToken = async function(token) {
    // const secret = process.env.SECRET_TEXT;
    try {
        const result = await jwtVerify(token, new TextEncoder().encode(secret));
        return result;
    } catch (error) {
        console.log("[verifyToken error] ==> ", error.toString());
    }
    return null;
}



export default{ fakeToken, createFakeToken, verifyToken, createToken };