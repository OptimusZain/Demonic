const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const cors = require("cors");
// app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../Backend/db");
const collection = "credentials";
db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database");
    process.exit(1);
  } else {
    app.listen(3000, async () => {
      console.log("Connected to database, listening to port 3000");
      await db.getDB().dropDatabase(collection);
      db.getDB().createCollection("credentials", {
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
              Role: {
                bsonType: "string",
                description: "only accepting strings",
              },
              uri: {
                bsonType: "string",
                description: "path in string data",
              },
            },
          },
        },
      });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash("admin", salt);
      const admin = {
        FirstName: "Zain",
        LastName: "Raza",
        Email: "zain@random.com",
        Password: hashedPassword,
        Role: "Admin",
        uri: "images/default.png",
      };

      db.getDB()
        .collection(collection)
        .insertOne(admin, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Admin Generated!");
            console.log(result.ops);
          }
        });
    });
  }
});

app.use("/api/images", express.static(path.join(__dirname, "public/images")));

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "wrong token, you are not authorized",
        });
      }
      const id = decoded.id;
      const role = decoded.role;
      req.userID = id;
      req.Role = role;
      next();
    });
  } else {
    res.json({ auth: false, message: "You do not have a token" });
  }
};

function verifyRole(role) {
  return (req, res, next) => {
    if (req.Role !== role) {
      res.json({ auth: false, message: "Access Denied!" });
    }
    next();
  };
}

app.get("/user/:email", (req, res) => {
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
      Role: req.body.Role,
      uri: "public/images/default.png",
    };

    db.getDB()
      .collection(collection)
      .insertOne(user, (err, result) => {
        if (err) console.log(err);
        else {
          console.log("Registration Successful!");
          console.log(result.ops);
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

  console.log("Login Successful!");
  if (User === null) {
    res.json({ auth: false, message: "User does not exist!", statusCode: 400 });
  } else {
    if (await bcrypt.compare(req.body.Password, User.Password)) {
      const id = User._id;
      const role = User.Role;
      const token = jwt.sign({ id, role }, process.env.SECRET);
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

app.get("/users", async (req, res) => {
  await db
    .getDB()
    .collection(collection)
    .find({ Role: "Basic" })
    .toArray((err, documents) => {
      if (err) {
        console.log("error");
        console.log(err);
      } else {
        // console.log(documents);
        res.json(documents);
      }
    });
});

app.post("/delete/:id", verifyJWT, verifyRole("Admin"), (req, res) => {
  const toDoID = req.params.id;
  console.log("About to Delete ", toDoID);
  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(toDoID) }, (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "." + MIME_TYPE_MAP[file.mimetype]
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/img", upload.single("image"), async (req, res) => {
  const img = req.file;
  const emailID = req.body.email;
  const path = img.path.split("public/");
  console.log("This is the new path", path[1]);
  if (!img) {
    console.log("error, please upload a file! ");
    res.json({
      upload: false,
      message: "No File uploaded",
      statusCode: 400,
    });
  } else {
    console.log("File upload successfully: ", img);

    db.getDB()
      .collection(collection)
      .findOneAndUpdate(
        { Email: emailID },
        { $set: { uri: path[1] } },
        { returnOriginal: false },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.json({
              path: path[1],
              upload: true,
              message: "File uploaded successfully",
              statusCode: 200,
            });
          }
        }
      );
  }
});
