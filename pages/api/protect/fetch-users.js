import { Users } from "../../../data/user";

/**
 * this service is protected, which is not allowed access without Login
 * 
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
    const protectUsers = Users.map(e=>{
        const {password, ...user} = e;
        return user;
    });
    res.status(200).send(protectUsers);
}