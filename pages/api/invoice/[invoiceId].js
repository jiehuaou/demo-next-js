
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


function getListById(invoiceId, len = 2) {
  return  [...Array(len).keys()].map((x)=>({title: `Invoice ${x+1}`, author: 'user: ' + invoiceId}));
}

export default async function handler(req, res) {
    const query = req.query;
    const { invoiceId } = query;
    const len = Math.round( Math.random() * 4)  + 1;
    console.log(`slow-invoice ......user: ${invoiceId} ........... ${index++}`);
    
      await new Promise(()=>{
        setTimeout(() => {
          if(invoiceId==='Fake1'){
            res.status(400).json([]);
          }else{
            res.status(200).json(getListById(invoiceId, len));
          }
    
        }, 600);
    });

    res.status(200).json({});
  }  