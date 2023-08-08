import { Users } from "../../../data/user";
import createToken from "../../../data/access-token";

/**
 * this service is fake one to mock an external java service.
 * caller must provide jwt through headers.
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns {Promise<void>}
 */
export default function handler(req, res) {
    const { headers } = req;
    const { authorization } = headers;
    console.log("authorization --> ", authorization);

    const externalUsers = Users.map(e=>{
        const {password, ...user} = e;
        user.role = 'external-' + user.role;
        
        return user;
    });
    res.status(200).send(externalUsers);
}