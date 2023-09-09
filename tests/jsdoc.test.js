import { assert, expect } from 'chai';  // Using Assert style


/**
 * import module is relative simple,  use only one logical name even from different files.
 * 
 * @typedef {import("foo-lib").FooRequest} FooRequest
 * @typedef {import("foo-lib").FooResponse} FooResponse
 * @typedef {import("foo-lib").query} query
 */

/**
 * import namespace is verbose, which use path/filename, and looks hard to maintain.
 * 
 * @typedef {import('@ts/shape-namespace').Point} Point
 * @typedef {import('@ts/shape-namespace').Circle} Circle
 * @typedef {import('@ts/shape-namespace').getArea} GetCircleArea
 * 
 * @typedef {import('@ts/shape-namespace2').Rectangle} Rectangle
 * @typedef {import('@ts/shape-namespace2').getArea} GetRectArea
 */



const DaysOfWeek = Object.freeze({
    Mon : 1,
    Tue : 2,
    Wed : 3,
    Thu : 4,
    Fri : 5,
    Sat : 6,
    Sun : 7,
    None: 0,
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
    0: 'None'
});

/**
 * 
 * @param {WeekNumber} weekDay
 * @return {WeekString}
 */
const fromWeekDay = (weekDay) => {
    /**
     * @type {WeekString}
     */
    // let result = "None";
    // Object.entries(DaysOfWeek).findIndex((entry) => {
    //     const [x,y] = entry;
    //     if (y === weekDay) {
    //         result = /** @type {WeekString} */ (x);
    //     }
    // });

    return DaysOfWeek[weekDay];
}

/**
 * 
 * @param {WeekString} week 
 * @returns {WeekNumber}
 */
const toWeekDay = (week) => {
    return DaysOfWeek[week];
}

/**
 * @type{query}
 */
const fooQuery = (request) => {
    if (typeof request === 'string') {
        return {
            id: 0,
            expired: Math.floor(new Date().getTime() / 1000) + 1000,
            token: 'test-' + request
        }
    }
    /**
     * @type{FooResponse}
     */
    const result = {
        id: request.id,
        expired: Math.floor(new Date().getTime() / 1000) + 1000,
        token: 'test-' + request.name
    }
    return result;
}

/**
 * compute Area of Circle, Implementation
 * @type {GetCircleArea}  
 */
const getCircleArea = (circle) => {
    const result = circle.radius * circle.radius * Math.PI;
    return result;
}

/**
 * compute Area of Rectangle, Implementation
 * @type {GetRectArea}  
 */
const getRectArea = (rectangle) => {
    const result = (rectangle.start.x - rectangle.end.x) *
        (rectangle.start.y - rectangle.end.y);
    return Math.abs(result);
}

/**
 * @template T
 * @param {T} data
 * @returns {Promise<T>}
 * @example signature:
 * function toPromise<T>(data: T): Promise<T>
 */
function toPromise(data) {
    return Promise.resolve(data);
}

/**
 * never Return
 * @returns {never}
 */
function neverReturn() {
    console.log('never return');
    throw new Error('never return');
}

describe('jsdoc test', () => {
    it('jsdoc cast test', () => {
        /**
         * @type {MyIdentity2}
         */
        const myId = {
            name: 'test@example.com',
            id: 30,
            token: '11188889999'
        }
        const jsData = JSON.parse("{\"name\":\"test@example.com\",\"id\":30,\"token\":\"11188889999\"}");

        // cast any to MyIdentity2, Note: use (any type) to cast data,
        const result =/** @type {MyIdentity2} */ (jsData);

        expect(result.token).to.be.equal(myId.token);
    })

    it('jsdoc template 1 test', async () => {
        const param = 'hello';
        /**
         * @type {string}
         */
        const result = await toPromise(param);
        expect(result).to.be.equal(param);
    })

    it('jsdoc template 2 test', async () => {
        const param = 123;
        /**
         * @type {number}
         */
        const result = await toPromise(param);
        expect(result).to.be.equal(param);
    })

    it('jsdoc import foo-module 1 test', () => {
        /**
         * @type{FooRequest}
         */
        const request = {
            id: 123,
            name: 'hello',
            extra: 'extra-1'
        }

        const result = fooQuery(request);

        expect(result.id).to.be.equal(request.id);
        expect(result.token).to.be.equal(`test-${request.name}`);
    })

    it('jsdoc import foo-module 2 test', () => {
        /**
         * @type{string}
         */
        const request = 'hello';

        const result = fooQuery(request);

        expect(result.id).to.be.equal(0);
        expect(result.token).to.be.equal(`test-${request}`);
    })

    it('jsdoc import namespace myshape 1 test', () => {
        /**
         * @type{Circle}
         */
        const request = {
            center: { x: 2, y: 3 },  // this circle does not have "z" property.
            radius: 10
        }

        const result = getCircleArea(request);
        expect(result).to.be.equal(10 * 10 * Math.PI);
    })

    it('jsdoc import namespace myshape 2 test', () => {
        /**
         * @type{Rectangle}
         */
        const request = {
            start: { x: 2, y: 3, z: 4 },  // this circle does have "z" property.
            end: { x: 4, y: 6 },
        }

        const result = getRectArea(request);
        expect(result).to.be.equal((4 - 2) * (6 - 3));
    })

    it('jsdoc neverReturn test', () => {
        // todo: fix
    })

    it('jsdoc Destructuring test', () => {
        /**
         * @type {{name?: string}}
         */
        const request = {
            name: 'hello',
        }
        const { name } = request;
        console.log(name);
    })
});