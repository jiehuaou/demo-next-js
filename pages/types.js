//@ts-check

/**
 * this file is for types definition only.
 */

/**
 * @typedef {object} LoginUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * 
 * @typedef {object} UserExtendedPart
 * @property {string} [role]
 * @property {string} [accessToken]
 * @property {string} [refreshToken]
 * @property {number} [tokenExpireAt] 
 */

/**
 * @typedef {object} SecretPart
 * @property {number} password
 */

/**
 * @typedef {LoginUser & UserExtendedPart } ExtendedUser
 */

/**
 * @typedef {ExtendedUser & SecretPart} RawUser
 */


 export const unused = {}





