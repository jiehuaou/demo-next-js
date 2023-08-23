//@ts-check

/**
 * mock the database
 * @type {import('../types/types').RawUser []}
 */

const Users = [
    { id: "111", name: "John Doe", email: "johnDoe@xyz.com", password: 1234, role: "user" },
    { id: "112", name: "Jane Doe", email: "janeDoe@xyz.com", password: 1234, role: "user"  },
    { id: "113", name: "John Admin", email: "JohnAdmin@xyz.com", password: 1234, role: "admin" },
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
 * @return {import("../types/types").ExtendedUser|null}
 */
const validateUser = function (email, password) {
    const email2 = email.trim().toLowerCase();
    const user = Users.find(e => {
        return e.email.toLowerCase() === email2 && e.password === parseInt(password)
    })

    console.log(`[validateUser] ${email}/${password}  .............. `, user);

    if (!user) {
        return null;
    }
    /**
     * 
     */
    const { password: psw, ...protectUser } = user; // skip the password
    return protectUser;
}


export { validateUser, Users };
