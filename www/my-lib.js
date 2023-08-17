//@ts-check


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


export default hello;