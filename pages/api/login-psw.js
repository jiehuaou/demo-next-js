//@ts-check
import { Users } from "../../data/user";

/**
 * demo an authentication backend service ( mock java access to database )
 *
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return;
        }
        const body = JSON.parse(JSON.stringify(req.body))
        const user = Users.find((user) => user.email === body.email && user.password === parseInt(body.password));
        if (!user) {
            res.status(404).send({ message: 'User does not exit!' });
            return;
        }

        let {password, ...protectUser} = user; // skip the password
        res.status(200).json(protectUser);
    } catch (error) {
        res.status(405).send({ message: `{error.message}` });
        return;
    }
};