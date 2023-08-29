//@ts-check
///  <reference path="../types/other.ts"  />
//// <reference path="../types/other2.d.ts"  />

/**
 * demo how to reference types from d.ts file
 */

//  * @typedef {import("../types/other").greetFunction} greetFunction
//  * @typedef {import("../types/other").contactFunction} contactFunction

// /**
//  * @typedef {import("../types/other").MyIdentity & import("../types/other2").MyIdentity} MyIdentity
//  * @typedef {import("../types/other").MyContact & import("../types/other2").MyContact} MyContact
//  */

/**
 * @typedef {import("../types/other").MyIdentity} MyIdentity
 * @typedef {import("../types/other").MyContact} MyContact
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
 * @param {MyIdentity} params
 * @return {MyIdentity}
 */
const helloIdentity = (params) => {
    console.log("hello2 ==>", params);
    console.log("hello2 token ==>", params.token);
    const {id, name, token} = params;
    const result = {id, name, token: token + '*'}
    return result;
}

/**
 * demo function implementation of Other.contactFunction.
 * @param {MyContact} params
 * @return {MyContact}
 */
 const helloContact = (params) => {
    console.log("hello2 ==>", params);
    console.log("hello2 mobile ==>", params.mobile);
    const {mobile, age, email} = params;
    const result = {age, email, mobile: mobile + '*'};
    return result;
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


export {hello, helloIdentity, helloContact, talkEx};
