//@ts-check
import tk from "../../data/access-token";
import { validateUser } from "../../data/user";

/**
 * demo an authentication backend service ( mock the java back-end with database service)
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
        const user = validateUser(body.email, body.password);
        if (!user) {
            res.status(404).send({ message: 'User does not exit!' });
            console.log(`[api.login-psw] ${body.email}/${body.password}  .............. `, 'login failed with ', user);
            return;
        }

        user.accessToken = await tk.createToken(user);

        res.status(200).json(user);
    } catch (error) {
        res.status(405).send({ message: `{error.message}` });
        return;
    }
};