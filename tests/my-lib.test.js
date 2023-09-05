//@ts-check
//// <reference path="../types/other.d.ts"  />

import { assert, expect } from 'chai';  // Using Assert style
import { hello, helloIdentity, helloContact, talkEx } from '../www/my-lib';

/**
 * @typedef {import("@ts/other").MyIdentity} MyIdentity000
 * @typedef {import("@ts/other").MyContact}  MyContact000
 */

describe('test hello lib', () => {
    it('keep the email property of params', () => {
        /**
         * this type is from global
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
         * this type is from global
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
         * this type is from import
         * @type {MyIdentity000}
         */
        let params = {
            name: 'test@example.com',
            id: 30,
            token: '66666666666'
        };

        const result = helloIdentity(params);

        assert.strictEqual(result.token, '66666666666*');
    });

    it('test hello2 of contactFunction type', () => {
               
        /**
         * this type is from global
         * @type {MyContact2}
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