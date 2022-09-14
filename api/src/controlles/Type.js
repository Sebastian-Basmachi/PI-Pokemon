const axios = require('axios');
const { Type } = require('../db');

const getTypes = async (req, res) => {
    try{
        let dbTypes = await Type.findAll() 
        if(dbTypes.length > 0){ return res.json(dbTypes) }
        else{
            let apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
            let idCount = 0;
            let theRealType = apiTypes.data.results.map( tp => {
                let typeModel = {
                    id: idCount += 1,
                    name: tp.name
                };
                // es lo mismo que hacer el map de abajo, optimizo tiempo
                Type.create(tp);
                
                return typeModel;
            });
            // typesForCreate.map( tp => {
            //     Type.create(tp);
            // });
             
            return res.send(theRealType);
        }
    } catch(e) {
        res.status(400).send('Something is doing wrong')
    }    
}


module.exports = { getTypes };