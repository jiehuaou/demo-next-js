//@ts-check
import { assert, expect } from 'chai';  // Using Assert style
import hello from '../www/my-lib';

describe('hello', () => {
    it('keep the email property of params', () => {

        const params = {
            email: 'test@example.com',
            role: 'user',
            accessToken: '66666666666'
        };
        //const consoleSpy = jest.spyOn(console, 'log');

        const result = hello(params);

        expect(result.email).to.be.equal('test@example.com');
    });

    it('modifies the extra property of params', () => {
        const params = {
            email: 'test@example.com',
            role: 'user',
            accessToken: '66666666666'
        };

        const result = hello(params);

        assert.strictEqual(result.extra, 'extra');
    });
});