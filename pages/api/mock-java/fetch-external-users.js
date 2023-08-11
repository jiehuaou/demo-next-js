import { Users } from "../../../data/user";
import tk from "../../../data/access-token";

/**
 * this service is fake one to mock an external java service.
 * caller must provide jwt through headers.
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
    const { headers } = req;
    const { authorization } = headers;
    console.log("authorization --> ", authorization);
    if (!authorization || ! await tk.verifyToken(authorization.slice(7))) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const externalUsers = Users.map(e=>{
        const {password, ...user} = e;
        user.role = 'external-' + user.role;
        
        return user;
    });
    res.status(200).send(externalUsers);
}