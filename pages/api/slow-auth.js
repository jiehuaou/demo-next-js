const uuid = require('uuid');

const nameList = [ 'John', 'Tiger', 'Fake', 'Alex', 'Joe'];

const getName =function () {
    const index = Math.floor(Math.random() * nameList.length) ;
    console.log(`name index ........... ${index}`);
    return nameList[index];
}

export default async function handler(req, res) {

    await new Promise(()=>{
        setTimeout(() => {
            res.status(200).json({ user: getName(), token: uuid.v4(), stamp: new Date()});
            //return 'done';
        }, 1200);
    });

    res.status(200).json({});
    
  }