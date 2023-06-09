//@ts-check

/**
 * @typedef {object} LoginUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} id
 */

/**
 * @typedef {object} Secret
 * @property {number} password
 */

/**
 * @typedef {LoginUser & Secret} RawUser
 */

/**
 * mock the database
 * @type {RawUser[]}
 */

const Users = [
    { id: "111", name: "John Doe", email: "johnDoe@xyz.com", password: 1234, role: "user" },
    { id: "112", name: "Jane Doe", email: "janeDoe@xyz.com", password: 1234, role: "user" },
    { id: "113", name: "Jenny Joe", email: "johnAdmin@xyz.com", password: 1234, role: "admin" },
    { id: "114", name: "Jude Doe", email: "judeDoe@xyz.com", password: 1234, role: "admin" },
];



(function test(index) {
    const user = Users[index];
    console.log(user.password, user.email);
})(0);



/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {LoginUser|null}
 */
const validateUser = function (email, password) {
    const email2 = email.trim().toLowerCase();
    const user = Users.find(e=>{
        return e.email.toLowerCase()===email2 && e.password===parseInt(password)
    })

    console.log(`[validateUser] ${email}/${password}  .............. `, user);

    if (!user) {
        return null;
    }
    /**
     * 
     */
    const {password: psw, ...protectUser} = user; // skip the password
    return protectUser;
}


export { validateUser, Users };
