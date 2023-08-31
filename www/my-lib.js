////  <reference path="../types/other.ts"  />

/**
 * demo how to reference types from d.ts file
 */


 /**
  * @typedef {import("../types/other").MyIdentity} MyIdentity
  * @typedef {import("../types/other").MyContact} MyContact
  * @typedef {import("../types/other").greetFunction} greetFunction
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
 * demo function implementation of greetFunction.
 * @type {greetFunc}
 */
const helloIdentity = (params) => {
    console.log("hello2 ==>", params);
    console.log("hello2 token ==>", params.token);
    const { id, name, token } = params;
    /**@type{MyIdentity2} */
    const result = { id: id, name, token: token + '*' }
    return result;
}

/**
 * demo function implementation of contactFunction.
 * @param {MyContact2} params
 * @return {MyContact2}
 */
const helloContact = (params) => {
    console.log("hello2 ==>", params);
    console.log("hello2 mobile ==>", params.mobile);

    /**
     * this type is from import
     * @type {MyContact}
     */
    const bb = { age: 10, email: '111@qq.com', mobile: '111' };
    console.log(bb);

    const { mobile, age, email } = params;
    /**
     * this type is from global
     * @type {MyContact2}
     */
    const result = { age: age, email, mobile: mobile + '*' };
    return result;
}

/**
 * @type {talk}
 */
const talkEx = (params) => {
    console.log(params);
    const { action, where, world: { target, title } } = params;
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


export { hello, helloIdentity, helloContact, talkEx };
