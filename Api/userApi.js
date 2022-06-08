const express = require("express");
const userApp = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//parse body it is also a middleware but in built
userApp.use(express.json());

//defining middleware
// const middleware = (req, res, next) => {
//     console.log("middle excuted");
//     next();//sends to next step
// }

let users = [
  {
    id: 100,
    username: "Vishesh",
    email: "Vihesh@gmail.com",
  },
  {
    id: 200,
    username: "Vishesh",
    email: "Vihesh@gmail.com",
  },
];

//defining routes
// userApp.get('/get-user/:id', middleware, (req, res) => {
userApp.get("/get-user/:id", async (req, res) => {
  let userId = req.params.id;
  userId = parseInt(userId);
  //let user = users.find(userObj => userObj.id == userId)
  let dbcollection = req.app.get("dbcollection");
  let users = await dbcollection.findOne({ id: userId }, { id: 1 });
  res.send({
    message: "user data",
    payload: users,
  });
});

userApp.get("/get-users", async (req, res) => {
  // res.send({
  //     message: "this in all user ", payload: users
  // })
  let dbcollection = req.app.get("dbcollection");
  let users = await dbcollection.find().toArray();
  res.send({ message: "user data", payload: users });
});

userApp.post("/create-user", async (req, res) => {
  let dbcollection = req.app.get("dbcollection");
  let userObj = req.body;
  // users.push(userObj)
  let hashpassword = await bcryptjs.hash(userObj.password, 6);
  userObj.password = hashpassword;
  await dbcollection.insertOne(userObj);

  res.send({
    message: "this in created user ",
  });
});

userApp.put("/update-user", async (req, res) => {
  let dbcollection = req.app.get("dbcollection");
  let userObj = req.body;
  // let newuserObj = req.body
  // let indexOfUserInList = users.findIndex(userObj => userObj.id === newuserObj.id)

  // //if user not existed
  // if (indexOfUserInList == -1) {
  //     res.send({ message: "No user existed top modify" })
  // }
  // //if user existed
  // else {
  //     users.splice(indexOfUserInList, 1, newuserObj);
  // }
  await dbcollection.updateOne(
    { username: userObj.username },
    { $set: { city: userObj.city } }
  );
  res.send({
    message: "this in updated user ",
  });
});

userApp.delete("/remove-user/:id", async (req, res) => {
  let dbcollection = req.app.get("dbcollection");
  let userId = +req.params.id;
  // let deleteObj = req.body;
  // let deleteIndx = users.findIndex(userObj => userObj.id === deleteObj.id)
  // users.splice(deleteIndx, 1)
  await dbcollection.deleteOne({ id: userId });
  res.send({
    message: "this in deleted user ",
  });
});
//verifytoke middle
const verifytoken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token === undefined) {
    res.send({ message: "unauthorized access" });
  } else {
    try {
      let result = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (err) {
      res.send({ message: err });
    }
  }
};
userApp.get("/test", verifytoken, async (req, res) => {
  res.send({ message: "successfull access" });
});
userApp.post("/login", async (req, res) => {
  let dbcollection = req.app.get("dbcollection");
  let userCredential = req.body;
  let user = await dbcollection.findOne({ username: userCredential.username });

  if (user == null) {
    res.send("user does not exist");
  } else {
    let isTrue = await bcryptjs.compare(userCredential.password, user.password);
    if (!isTrue) {
      res.send("Invalid Password");
    } else {
      let token = jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: 1200,
        }
      );
      res.send({ message: "logged in successfully", token: token });
    }
  }
});

module.exports = userApp;
