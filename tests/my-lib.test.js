//@ts-check
//// <reference path="../types/other.d.ts"  />

import { assert, expect } from 'chai';  // Using Assert style
import { hello, helloIdentity, helloContact, talkEx } from '../www/my-lib';

/**
 * @typedef {import("../types/other").MyIdentity} MyIdentity
 * @typedef {import("../types/other").MyContact} MyContact
 */

describe('test hello lib', () => {
    it('keep the email property of params', () => {
        /**
         * @type {SessionEx}
         */
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
        /**
         * @type {SessionEx}
         */
        const params = {
            email: 'test@example.com',
            role: 'user',
            accessToken: '66666666666'
        };

        const result = hello(params);

        assert.strictEqual(result.extra, 'extra');
    });

    it('test hello2 of greetFunction type', () => {
        /**
         * @Type {MyIdentity}
         */
        let params;
        params = {
            name: 'test@example.com',
            id: 30,
            token: '66666666666'
        };

        const result = helloIdentity(params);

        assert.strictEqual(result.token, '66666666666*');
    });

    it('test hello2 of contactFunction type', () => {
               
        /**
         * @Type {MyContact}
         */
        let params = {
            email: 'test@example.com',
            age: 30,
            mobile: '11188889999'
        };

        const result = helloContact(params);
        
        assert.strictEqual(result.mobile, '11188889999*');
    });

    it('test Declaration merging allows you to extend', () => {
        /**
         * @type {HelloEx}
         */
        const param = {
            action: 'hello',
            where: 'china',
            world: {
                target: 'Tiger',
                title: 'Sir',
            }
        }
        const result = talkEx(param);
        result.world.title = 'Sir';
        expect(result).to.be.deep.equal(param);
    })

    it('test function from TS ', () => {
        /**
         * @type {HelloEx}
         */
        const param = {
            action: 'hello',
            where: 'china',
            world: {
                target: 'Tiger',
                title: 'Sir',
            }
        }
        const result = talkEx(param);
        result.world.title = 'Sir';
        expect(result).to.be.deep.equal(param);
    })

});