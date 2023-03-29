const {MongoClient} = require('mongodb');
// Database uri
const uri = 'mongodb://127.0.0.1:27017';

const connectToDB = async (uri, crudOp, data) => {
    let result;
    client = new MongoClient(uri);
    try{
        await client.connect();

        const db = client.db('pizza_house');
        switch(crudOp){
            case 'save':
                result = await db.collection('pizza').insertOne(data.doc)
                break;
            case 'find':
                result = [];
                if(typeof data.filter !== 'undefined'){
                    if(data.filter.hasOwnProperty('_id')){
                        result = await db.collection('pizza')
                        .findOne(data.filter)

                    } else {
                        await db.collection('pizza')
                        .find(data.filter)
                        .forEach(doc => result.push(doc))
                        
                    }

                } else {
                await db.collection('pizza')
                .find()
                .forEach(doc => result.push(doc))

            }
                break;
            case 'update':
                break;
            case 'delete':
                result = await db.collection('pizza')
                .deleteOne(data.id);
                break;
        }

    } catch(err) {
        console.log(err);

    }
    return result;
}

// this function save document to a collection
const save = async (doc) => {
    const result = await connectToDB(uri, 'save', {doc}).catch(err => console.error(err));
    return result
}

// this function get document from a collection
const find = async (filter) => {
        const result = await connectToDB(uri, 'find', {filter});
        return result;
}

// thid function delete on document from a collection
const _delete = async (id) => {
    const result = await connectToDB(uri, 'delete', {id});
    return result;
}

module.exports = {
    save,
    find,
    _delete
}