import jwt from "jsonwebtoken";

const secret = process.env.SECRET_TEXT;

const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJoZWxsb0Bjb21wYW55LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTkxODIzOTAyMiwiZXhwIjoxOTE4MjM5MDIyfQ.X24Qljc7h2FdlNQY2kYm7SqNTH1YxiucwIJzhe3FAc4";

/**
 * Creates a token for the given user.
 *
 * @param {object} user - The user object.
 * @return {string} The generated token.
 */
const createFakeToken = function(user) {
    return fakeToken;
}

const createToken = function(user) {
    // const secret = process.env.SECRET_TEXT;
    let exp = Math.floor(Date.now() / 1000) + (60 * 60);
    let iat = Math.floor(Date.now() / 1000) ;
    const {accessToken, refreshToken, ...data} = user;
    const jwtData = {
        exp, iat, ...data
    }
    return jwt.sign(JSON.stringify(jwtData), secret);
}

const verifyToken = function(token) {
    // const secret = process.env.SECRET_TEXT;
    let data = null;
    try {
        data = jwt.verify(token, secret);
        if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) {
            throw new Error("Token expired");
        }
    } catch (error) {
        console.log("[verifyToken error] ==> ", error.toString());
        return null;
    }
    return data;
}


export default{ fakeToken, createFakeToken, verifyToken, createToken };