//@ts-check
import { assert, expect } from 'chai';  // Using Assert style
import LoggerFactory from '../lib/logger';


describe('logger test', () => {
    it('test to show log when flag is true', () => {
        const log = LoggerFactory(true);
        const text = log('hello', 'world', 'hello', 'nextjs');
        expect(text).to.have.same.members(['hello', 'world', 'hello', 'nextjs']);
    });

    it('test to show log when flag is "true" ', () => {
        const log = LoggerFactory("true");
        const text = log('hello', 'world', 'hello', 'nextjs');
        expect(text).to.have.same.members(['hello', 'world', 'hello', 'nextjs']);
    });

    it('test not to show log when flag is false', () => {
        const log = LoggerFactory(false);
        let text = log('hello', 'world', 'hello', 'nextjs');
        expect(text).to.be.equal('');
    });

    it('test not to show log when flag is undefined', () => {
        const log = LoggerFactory();
        let text = log('hello', 'world', 'hello', 'nextjs');
        expect(text).to.be.equal('');
    });


});
