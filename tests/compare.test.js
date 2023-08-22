// @ts-nocheck
import { assert, expect } from 'chai';  // Using Assert style

describe('compare test', () => {
    it('test to compare true & "true"', () => {
        let text = '';
        const flag = true;
        /**
         * @type {boolean|string}
         */
        const actual = 'TRUE';
        if(flag === Boolean(actual)){ 
            text = 'hello';
        }
        expect(text).to.be.equal('hello');
    });

});

