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
    let exp = Math.floor(Date.now() / 1000) + (60 * 60);
    let iat = Math.floor(Date.now() / 1000) ;
    const {accessToken, refreshToken, ...data} = user;
    const jwtData = {
        exp, iat, ...data
    }
    return jwt.sign(JSON.stringify(jwtData), secret);
}


export { fakeToken, createFakeToken };
export default createToken;