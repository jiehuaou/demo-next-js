// const uuid = require('uuid');

import { v4 as uuid } from 'uuid';

const nameList = [ 'John', 'Tiger', 'Fake', 'Alex', 'Joe'];

const getName =function () {
    const index = Math.floor(Math.random() * nameList.length) ;
    console.log(`name index ........... ${index}`);
    return nameList[index];
}

/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default async function handler(req, res) {

    await new Promise(()=>{
        setTimeout(() => {
            res.status(200).json({ user: getName(), token: uuid(), stamp: new Date()});
            //return 'done';
        }, 200);
    });

    res.status(200).json({});
    
  }