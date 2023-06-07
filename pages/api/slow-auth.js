const uuid = require('uuid');

const nameList = [ 'John', 'Tiger', 'Fake'];

const getName =function () {
    const index = 0;  // Math.round( Math.random() * 10) % nameList.length ;
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