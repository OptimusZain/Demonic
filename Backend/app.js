const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../MongoDB/db");
const collection = "credentials";

db.connect((err) => {
	if (err) {
		console.log("Unable to connect to database");
		process.exit(1);
	} else {
		app.listen(3000, () => {
			console.log("Connected to database, listening to port 3000");
			// if (!db.getDB().collection(collection)) {
			db.getDB().dropDatabase(collection);
			db.getDB().createCollection("credentials", {
				// strict: true,
				validator: {
					$jsonSchema: {
						bsonType: "object",
						required: ["FirstName", "LastName", "Email", "Password"],
						properties: {
							FirstName: {
								bsonType: "string",
								description: "string is compulsory",
							},
							LastName: {
								bsonType: "string",
								description: "string is compulsory",
							},
							Email: {
								bsonType: "string",
								description: "must be a string",
							},
							Password: {
								bsonType: "string",
								description: "only accepting strings",
							},
						},
					},
				},
			});

			db.getDB().createCollection("music", {
				validator: {
					$jsonSchema: {
						bsonType: "object",
						required: ["uri", "name", "artist"],
						properties: {
							uri: {
								bsonType: "string",
								description: "Must be a string",
							},

							name: {
								bsonType: "string",
								description: "Must be a string",
							},
							artist: {
								bsonType: "string",
								description: "Must be a string",
							},
						},
					},
				},
			});
		});
	}
});

const verifyJWT = (req, res, next) => {
	const token = req.headers["access-token"];

	if (!token) {
		res.json({ auth: false, message: "You do not have a token" });
	} else {
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				res.json({
					auth: false,
					message: "wrong token, you are not authorized",
				});
			}
			const id = decoded.id;
			req.userID = id;
			next();
		});
	}
};

app.get("/:email", (req, res) => {
	const userID = req.params.email;

	db.getDB()
		.collection(collection)
		.findOne({ Email: userID }, (err, result) => {
			if (err) console.log(err);
			else {
				console.log(result);
				res.json(result);
			}
		});
});

app.post("/register", async (req, res) => {
	const user = await db
		.getDB()
		.collection(collection)
		.findOne({ Email: req.body.Email });

	console.log(user);

	if (user !== null) {
		console.log("email already exists");
		res.status(400).send("Email already exists!");
	} else {
		console.log(req.body.Email);
		console.log("email does not exist");

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.Password, salt);
		const user = {
			FirstName: req.body.FirstName,
			LastName: req.body.LastName,
			Email: req.body.Email,
			Password: hashedPassword,
		};

		db.getDB()
			.collection(collection)
			.insertOne(user, (err, result) => {
				if (err) console.log(err);
				else {
					console.log(result);
					res.json({ result: result, document: result.ops[0] });
				}
			});
	}
});

app.post("/login", async (req, res) => {
	const Email = req.body.Email;

	const User = await db
		.getDB()
		.collection(collection)
		.findOne({ Email: Email });

	console.log(User);
	if (User === null) {
		res.json({ auth: false, message: "User does not exist!", statusCode: 400 });
	} else {
		if (await bcrypt.compare(req.body.Password, User.Password)) {
			const id = User._id; // res.status(200).send({ error: "User exists!", statusCode: 200 });
			const token = jwt.sign({ id }, process.env.SECRET);
			// console.log(token);
			res.json({ auth: true, token, User });
		} else {
			res.json({
				auth: false,
				message: "Wrong Email or Password",
				statusCode: 400,
			});
		}
	}
});

// app.delete("/:id", (req, res) => {
// 	const toDoID = req.params.id;
// 	db.getDB()
// 		.collection(collection)
// 		.findOneAndDelete({ _id: db.getPrimaryKey(toDoID) }, (err, result) => {
// 			if (err) console.log(err);
// 			else {
// 				res.json(result);
// 			}
// 		});
// });

// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/credentials", (req, res) => {
// 	db.getDB()
// 		.collection(collection)
// 		.find({})
// 		.toArray((err, documents) => {
// 			if (err) console.log(err);
// 			else {
// 				console.log(documents);
// 				res.json(documents);
// 			}
// 		});
// });

// app.put("/:id", (req, res) => {
// 	const toDoID = req.params.id;
// 	const userInput = req.body;

// 	db.getDB()
// 		.collection(collection)
// 		.findOneAndUpdate(
// 			{ _id: db.getPrimaryKey(toDoID) },
// 			{ $set: { todo: userInput.todo } },
// 			{ returnOriginal: false },
// 			(err, result) => {
// 				if (err) console.log(err);
// 				else {
// 					console.log(result);
// 					res.json(result);
// 				}
// 			}
// 		);
// });
