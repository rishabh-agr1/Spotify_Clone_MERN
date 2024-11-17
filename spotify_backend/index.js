// npm init - initailizing the node project
// npm i express - installed expressJS package
// Node JS - working enviorment, , ReactJS - frontend framework, , ExpressJS - backend framework
// mongoose - package to link nodeJs and mongoDB

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/user"); // have to fix the error, if it is showing --  to fix : i changed "User" -> "user"
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port1 = 8000;



app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://rishabh:" + process.env.MONGO_PASSWORD + "@cluster0.esfuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((x) => { console.log("Connected to MongoDB") }).catch((err) => {
  console.log("Error in connecting to mongoDB")
});
// 1st argument - which db to connect,which i got from mongodb project's cluster 
//2nd arg - how to connect(various option are there)
// we will retrieve the password form the .env file, it is done for the serurity issue because if i will upload this file in github and wouldnt hide password in some another file which i wouldnt upload then anyone can access my database using the password




//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// JWT - JSON WEB TOKEN- each token will be unique for each users
// passport - user authentication framework
// this is used to authenticate users

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY; // imported the secret key from .env file
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await User.findOne({ _id: jwt_payload.identifier });
    if (user) {
      return done(null, user);
      // if the user exists and authentication succesful
    }
    else {
      return done(null, false);
      // if user doesnt exists and suggests to create a new account
    }
  } catch (err) {
    return done(err, false);
    // if error is there 
  }
  User.findOne({ id: jwt_payload.sub }, function (err, user) {

  });
}));




// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// API : GET type : "/" : respond "hello world"
app.get("/", (req, res) => {

  // req: contains all the data for the request
  // res: contains all the data for the response

  res.send("Hello World");
})

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

// telling express to run my server in port1 that is localhost:8000

app.listen(port1, () => {
  console.log("App is running on port " + port1);
})