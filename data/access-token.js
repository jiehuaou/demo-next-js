// import jwt from "jsonwebtoken";
import {jwtVerify, SignJWT, } from 'jose';

const secret = process.env.SECRET_TEXT;

const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJoZWxsb0Bjb21wYW55LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTkxODIzOTAyMiwiZXhwIjoxOTE4MjM5MDIyfQ.X24Qljc7h2FdlNQY2kYm7SqNTH1YxiucwIJzhe3FAc4";

/**
 * @typedef {import('jose').JWTVerifyResult} JWTVerifyResult
 * @typedef {import('jose').JWTPayload & import("../types/types").ExtendedUser} JWTPayloadEx
 */

/**
 * Creates a token for the given user.
 *
 * @param {JWTPayloadEx} user - The user object.
 * @return {string} The generated token.
 */
const createFakeToken = function(user) {
    return fakeToken;
}


/**
 * Creates a token for the given user.
 *
 * @param {JWTPayloadEx} user - The user object.
 * @param {number} [durationSeconds=180] - The duration of the token in seconds.
 * @param {number} [issuedAt=0] - The timestamp when the token was issued.
 * @return {Promise<string>} The generated token.
 */
const createToken = async function(user, durationSeconds = 180, issuedAt = 0) {
    let iat = issuedAt || Math.floor(Date.now() / 1000);
    let exp = iat + durationSeconds;
    const { accessToken, refreshToken, ...payload } = user;
    const jwt = new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat);
    return jwt.sign(new TextEncoder().encode(secret));
}


/**
 * Verify a token.
 *
 * @param {string} token - The token to verify.
 * @param {function} onError - (Optional) Callback function to handle errors.
 * @returns {Promise<JWTPayloadEx|null>} - A promise that resolves to the verification result.
 */
const verifyToken = async function(token, onError = () => {}) {
    try {
        const result = await jwtVerify(token, new TextEncoder().encode(secret));
        return result?.payload??null;
    } catch (/** @type {any} */ error) {
        // cast to generic Error
        const err = /** @type {ErrorType} */ (error);
        console.log("[verifyToken error] ==> ", err.toString());
        if(onError) {
            onError(error);
        }
    }
    return null;
}



export default{ fakeToken, createFakeToken, verifyToken, createToken };