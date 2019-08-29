const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://rajesh1:BBKwkffiBUSOo6h6@cluster0-olkcc.mongodb.net/shop?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(client => {
        console.log("Connected to mongodb");
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () =>{
    if(_db){
        return _db;
    }

    throw 'No Database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
