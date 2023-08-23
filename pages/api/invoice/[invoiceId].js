
/**
 *  demo dynamic quiery
 * 
 *  /api/invoice/[id]
 * 
 *   const query = req.query;
 *   const { id } = query;
 * 
 * @param {*} req 
 * @param {*} res 
 */

let index = 1;


/**
 * Generates a list of objects based on the given invoice ID and length.
 *
 * @param {string} invoiceId - The ID of the invoice.
 * @param {number} [len=2] - The length of the list to be generated. Default is 2.
 * @return {any[]} An array of objects, where each object represents an invoice with a title and author.
 */
function getListById(invoiceId, len = 2) {
  return  [...Array(len).keys()].map((x)=>({title: `Invoice ${x+1}`, author: 'user: ' + invoiceId}));
}

/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default async function handler(req, res) {
    const query = req.query;
    const { invoiceId } = query;
    const len = Math.round( Math.random() * 4)  + 1;
    console.log(`slow-invoice ......user: ${invoiceId} ........... ${index++}`);
    
      await new Promise(()=>{
        setTimeout(() => {
          if(invoiceId==='Fake1'){
            res.status(400).json([]);
          }else if(typeof invoiceId==='string'){
            res.status(200).json(getListById(invoiceId, len));
          }
    
        }, 600);
    });

    res.status(200).json({});
  }  