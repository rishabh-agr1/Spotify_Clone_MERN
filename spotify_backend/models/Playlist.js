// this file describes the user data model

const mongoose = require("mongoose");

//defining the schema of the modal as "User"
const Playlist = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    thumbnail:{
        type : String, // because we will use URL
        required : true
    },
    songs:[
        {  // the actual audio of the song
        type: mongoose.Types.ObjectId,
        ref : "song"
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        ref : "User" 
    },
    collaborators: [
        {
            type : mongoose.Types.ObjectId,
            ref : "user"
        }
    ]

})

const PlaylistModel = mongoose.model("Playlist",Playlist);

module.exports = PlaylistModel;