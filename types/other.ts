
/**
 * demo how to use .ts file to declare types.
 */


interface MyIdentity {
  id: number;
  name: string;
}

interface MyContact {
  email: string;
  age: number;
}

/**
 * greet function
 * @param {MyIdentity} param
 * @return {string}
 */
export type greetFunction = (param: MyIdentity) => MyIdentity;


/**
 * other greet function
 * @param {MyContact} param
 * @return {boolean}
 */
// export type contactFunction = (param: MyContact) => MyContact;

export {type MyIdentity,type MyContact };
