import { assert, expect } from 'chai';  // Using Assert style
// const assert = require('chai').assert;
// const expect = require('chai').expect;

import tk from "../data/access-token.js";
import * as jose from 'jose';

describe('test token module', async () => {
    const user = {
        id: "111", name: "John Doe", email: "johnDoe@xyz.com", password: 1234, role: "user",
    }
    let token = "valid_token";

    it('test to create token', async () => {
        token = await tk.createToken(user);
        assert.strictEqual(typeof token, 'string');

    });

    it('test to verify token OK', async () => {
        console.log(token);
        const result = await tk.verifyToken(token);
        const payload = result?.payload;
        assert.strictEqual(payload.email, user.email);
        
    });


    it('test to verify token in mal-formed', async () => {
        const result = await tk.verifyToken('anything wrong'
            , (/** @type {any} */ e)=>{
                expect(e).to.be.instanceOf(jose.errors.JWSInvalid);
            });
        assert.isNull(result);

    });

    it('test to verify token in expired', async () => {
        const result = await tk.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjEyMzQ1NjU0fQ.9LfNVeBASKOqPYRwYVgEVqfgbj7AMxK-bV0Lu7IiHow'
            , (/** @type {any} */ e)=>{
                expect(e).to.be.instanceOf(jose.errors.JWTExpired);
            });
        assert.isNull(result);
    });

    it('test to verify token in different key', async () => {
        const result = await tk.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            , (/** @type {any} */ e)=>{
                expect(e).to.be.instanceOf(jose.errors.JWSSignatureVerificationFailed);
            });
        assert.isNull(result);
    });
});