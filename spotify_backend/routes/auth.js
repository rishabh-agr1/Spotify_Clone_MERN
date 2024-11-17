const express = require("express");
const router = express.Router();// importing just Router functionalities of exrpress app
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

// this post route will help to register users
router.post("/register", async (req, res) => {
    // this code will run when the /register will be called as a POST request
    // my req.body will be of format {email, password, first_name, lastName, username}
    // req -> represents the requested data
    const {email, password, firstName, lastName, username} = req.body;

    // step 2 : does the user already exists (using email)
    const user = await User.findOne({email: email});
    if (user) {
        // we can also use res.json() directly, then the by default status code will be 200
        return res
            .status(403)
            .json({error: "A user with this email already exists"});
    }
    // This is a valid request

    // step3 : create a new user

    //first we will encrypt the password,,, we will convert the password into hash.
    const hashedPassword = await bcrypt.hash(password, 10);//encypt for 10 rounds
    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);

    // step4 : create token to return to the user(JWT)
    const token = await getToken(email, newUser);

    // step 5 : return the result
    const userToReturn = {...newUser.toJSON(), token};
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    // step 1 : get email ans password from user
    const {email, password} = req.body;

    // step 2 : check if user exists or not
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    console.log(user);

    /// step 3 : if the user exists, check the password is correct or not
    // problem is -> hash is a one way function and each time hash function generate different hash for same value also
    // for ease, we will use in-built function
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // This will be true or false.
    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    // step 4 : if everything is correct, return the token
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;