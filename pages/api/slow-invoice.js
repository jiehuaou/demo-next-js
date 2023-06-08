
/**
 *  /api/products?page=1&limit=10
 * 
 *   const query = req.query;
 *   const { page, limit } = query;
 * 
 * @param {*} req 
 * @param {*} res 
 */

let index = 1;


function getListById(id, len = 2) {
  return  [...Array(len).keys()].map((x)=>({title: `Invoice ${x+1}`, author: 'user: ' + id}));
}

export default async function handler(req, res) {
    const query = req.query;
    const { id } = query;
    const len = Math.round( Math.random() * 4)  + 1;
    console.log(`slow-invoice ......user: ${id} ........... ${index++}`);
    
      await new Promise(()=>{
        setTimeout(() => {
          if(id==='Fake'){
            res.status(400).json([]);
          }else{
            res.status(200).json(getListById(id, len));
          }
    
        }, 1600);
    });

    res.status(200).json({});
  }  