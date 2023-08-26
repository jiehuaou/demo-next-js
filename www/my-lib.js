//@ts-check
//reference path="../types/other.d.ts" 
//reference path="../types/global.d.ts" 


/**
 * demo how to reference types from d.ts file
 */

/**
 * Prints the value of params to the console.
 *
 * @param {SessionEx} params - The value to be printed.
 * @return {SessionEx} This function does not return a value.
 */
function hello(params) {
    console.log(params.email);
    params.extra = 'extra';
    return params;
}

/**
 * demo function implementation of Other.greetFunction.
 * @type {other.greetFunction}
 */
const helloFunction = (params) => {
    console.log("hello2 ==>", params);
    return "hello2"
}

/**
 * demo function implementation of Other.otherFunction.
 * @type {other.otherFunction}
 */
 const helloOther = (params) => {
    console.log("hello2 ==>", params);
    return true;
}

/**
 * @type {talk}
 */
const talkEx = (params) => {
    console.log(params);
    const {action,where, world : {target, title}} = params;
    const result = {
        action,
        where,
        world: {
            target,
            title
        }
    };
    return result;
}


export {hello, helloFunction, helloOther, talkEx};
