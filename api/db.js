const { MongoClient } = require("mongodb");
module.exports.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
