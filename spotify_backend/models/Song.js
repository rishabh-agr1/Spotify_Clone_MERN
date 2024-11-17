// this file describes the user data model

const mongoose = require("mongoose");

//defining the schema of the modal as "User"
const Song = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    thumbnail:{
        type : String, // because we will use URL
        required : true
    },
    track:{  // the actual audio of the song
        type: String,
        required: true
    }, // we will upload the song in the cloud and the link to that cloud will be stored here as a string
    artist:{
        type: mongoose.Types.ObjectId,
        ref : "User" 
    }

})

const SongModel = mongoose.model("Song",Song);

module.exports = SongModel;