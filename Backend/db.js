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
		MongoClient.connect(
			"mongodb+srv://Zain:ghost@cluster0.mto5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			(err, client) => {
				if (err) {
					console.log("failed");
					cb(err);
				} else {
					state.db = client.db(dbname);
					// console.log(state.db);
					cb();
				}
			}
		);
	}
};

const getPrimaryKey = (_id) => {
	return ObjectID(_id);
};

const getDB = () => {
	return state.db;
};

module.exports = { getDB, getPrimaryKey, connect };
