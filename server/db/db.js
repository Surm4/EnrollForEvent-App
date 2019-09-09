const dbcredentials = require('./dbcredentials')();
const MongoClient = require('mongodb').MongoClient;
const Uri = `MONGO_LOGIN_STRING`;

let DB;
const DbFunctions = {};

DbFunctions["INSERT"] = async (objectToHandle, DbClient) => {
    const collection = DbClient.db("EVENTS").collection("ENROLLED_USERS");
    let insertedSuccesfully;
    try {
        insertedSuccesfully = await collection.insertOne(objectToHandle);
        return !!insertedSuccesfully
    } catch (e) {
        console.log(e);
        return;
    } 
};

const DbService = async (option, objectToHandle) => {
        const DbClient = new MongoClient(Uri, { 
            useNewUrlParser: true,
            poolSize: 20,
            socketTimeoutMS: 480000,
            keepAlive: 300000,
            ssl: true,
            sslValidate: false
        });

        const connected = await new Promise((res, rej) => {
            DbClient.connect(async (err, database) => {
            if (err) {
                console.log(err);
                res(false);
            }
            console.log("CONNECTED SUCCESFULLY");
            res(true);
            })
        });

        if (!connected) {
            return;
        }

        const querySuccessful = await DbFunctions[option](objectToHandle, DbClient);

        DbClient.close();
        return querySuccessful;
};

module.exports = DbService;