
/**
 *  /api/products?page=1&limit=10
 * 
 *   const query = req.query;
 *   const { page, limit } = query;
 * 
 * @param {*} req 
 * @param {*} res 
 */

function get1(id) {
  return [
    { title: "Invoice 1", author: "user: " + id },
    { title: "Invoice 2", author: "user: " + id },
  ]
}

export default async function handler(req, res) {
    const query = req.query;
    const { id } = query;

    console.log(`slow-invoice ...... ${id}`);
    
      await new Promise(()=>{
        setTimeout(() => {
          if(id==='Fake'){
            res.status(400).json([]);
          }else{
            res.status(200).json(get1(id));
          }
    
        }, 1600);
    });

    res.status(200).json({});
  }