//import express
const express = require("express");

const mongoclient = require("mongodb").MongoClient;
const productApp = require("./Api/productApi");
const userApp = require("./Api/userApi");
const path = require("path");
const app = express();
require("dotenv").config();
app.use(express.static(path.join(__dirname, "./build")));
//database connection
const dbConnectUrl = process.env.DB_URL;
//connect to db
mongoclient
  .connect(dbConnectUrl)
  .then((client) => {
    const dbObj = client.db("DBofusers");
    const productcollection = dbObj.collection("productcollection");
    const dbcollection = dbObj.collection("usercollection");
    app.set("dbcollection", dbcollection);
    app.set("productcollection", productcollection);
    console.log("connected successfully to db");
  })
  .catch((err) => console.log("error occured"));

app.use("/user", userApp);
app.use("/product", productApp);

//port assign and adding listner
const port = 4000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
