
/**
 * Handles the request and response for the API endpoint.
 *
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @return {void}
 */
export default function handler(req, res) {
    res
      .status(200)
      .json({ total: 10, count: 1});
  }