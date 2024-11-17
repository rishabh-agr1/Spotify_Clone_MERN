// this file describes the user data model

const mongoose = require("mongoose");

//defining the schema of the modal as "User"
const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String
        // by default, the requiured is false.
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type : String,
        required :true
    },
    likedSongs:{
        type : String,
        default : ""
    },
    likedPlaylists:{
        type: String,
        default : ""
    },
    subscribedArtists:{
        type: String,
        default: ""
    }

})

const UserModel = mongoose.model("User",User);

module.exports = UserModel;