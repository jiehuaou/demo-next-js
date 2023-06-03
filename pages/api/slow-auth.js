const uuid = require('uuid');

const nameList = ['Albert', 'John', 'Tiger', 'Alex'];

const getName =function () {
    const index = Math.round( Math.random() * 10) % 4 ;
    console.log(`name index ........... ${index}`);
    return nameList[index];
}

export default async function handler(req, res) {

    await new Promise(()=>{
        setTimeout(() => {
            res.status(200).json({ user: getName(), token: uuid.v4(), stamp: new Date()});
            //return 'done';
        }, 1500);
    });

    res.status(200).json({});
    
  }