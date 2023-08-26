//@ts-check
import { assert, expect } from 'chai';  // Using Assert style
import { hello, helloFunction, talkEx } from '../www/my-lib';

describe('test hello lib', () => {
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

    it('test hello2 of Other.myFunction type', () => {
        /**
         * @Type {other.MyInterface}
         */
        const params = {
            email: 'test@example.com',
            age: 30,
        };

        const result = helloFunction(params);

        assert.strictEqual(result, 'hello2');
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