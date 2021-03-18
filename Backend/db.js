var MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "Demonic";
require("dotenv").config();
const url = process.env.DB_SERVER;
const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true };

const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    console.log(url);
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log("failed");
        cb(err);
      } else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, getPrimaryKey, connect };
