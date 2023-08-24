//@ts-check
/// <reference path="./global.d.ts" />

/**
 * this file is for Jsdoc definition only.
 * 
 * note: this file can not stay in /pages folder, 
 * because it does not export any react component, and will cause nextjs build failed.
 */


/**
 * @typedef {object} LoginUser
 * @property {string=} id
 * @property {string=} name
 * @property {string=} email
 */

/**
 * @typedef {object} SecretPart
 * @property {number=} password
 */

/**
 * @typedef {LoginUser & UserExtendedPart} ExtendedUser
 */

/**
 * @typedef {ExtendedUser & SecretPart} RawUser
 */


 export const unused = {}





