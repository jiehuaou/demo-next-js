import { assert, expect } from 'chai';  // Using Assert style

import tk from "../data/access-token.js";

describe('test token module', () => {
    const user = {
        id: "111", name: "John Doe", email: "johnDoe@xyz.com", password: 1234, role: "user",
    }
    let token = "valid_token";

    it('test to create token', () => {
        token = tk.createToken(user);
        assert.strictEqual(typeof token, 'string');

    });

    it('test to verify token OK', () => {
        const result = tk.verifyToken(token);
        assert.strictEqual(result.email, user.email);

    });

    it('test to verify token in mal-formed', () => {
        const result = tk.verifyToken('anything wrong');
        assert.isNull(result);

    });

    it('test to verify token in expired', async () => {
        const result = tk.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjEyMzQ1NjU0fQ.9LfNVeBASKOqPYRwYVgEVqfgbj7AMxK-bV0Lu7IiHow');
        assert.isNull(result);
    });

    it('Does not do much!', () => {
        expect(true).to.equal(true);
    });
});