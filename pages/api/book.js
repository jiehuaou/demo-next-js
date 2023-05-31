
/**
 * internal Web Service  /api/book
 * 
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
    res
      .status(200)
      .json({ title: "The fault in our stars", author: "John Green" });
  }