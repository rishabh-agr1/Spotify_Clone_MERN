const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/user");
const Song = require("../models/Song");

const router = express.Router();

// Route 1: Create a playlist
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {name, thumbnail, songs} = req.body;
        if (!name || !thumbnail || !songs) {
            return res.status(301).json({err: "Insufficient data"});
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: [],
        };
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
);

// Route 2: Get a playlist by ID
// "/:playlistId" -> it defines that the route path is variable
router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // This concept is called req.params
        const playlistId = req.params.playlistId;
        // I need to find a playlist with the _id = playlistId
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);

// Get all playlists made by me
// /get/me
router.get(
    "/get/me",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.user._id;

        const playlists = await Playlist.find({owner: artistId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    }
);

// Get all playlists made by an artist
// /get/artist/xyz
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.params.artistId;

        // We can do this: Check if artist with given artist Id exists
        const artist = await User.findOne({_id: artistId});
        if (!artist) {
            return res.status(304).json({err: "Invalid Artist ID"});
        }

        const playlists = await Playlist.find({owner: artistId});
        return res.status(200).json({data: playlists});
    }
);

// Add a song to a playlist
router.post(
    "/add/song",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {playlistId, songId} = req.body;
        // check if playlist exists or not
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(304).json({err: "Playlist does not exist"});
        }

        //check if the user is a owner or collabrator of that playlist or not
        if (
            !playlist.owner.equals(currentUser._id) &&
            !playlist.collaborators.includes(currentUser._id)
        ) {
            return res.status(400).json({err: "Not allowed"});
        }
        // check if the song is even valid or not
        const song = await Song.findOne({_id: songId});
        if (!song) {
            return res.status(304).json({err: "Song does not exist"});
        }

       // now, we can finally add the song
        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json(playlist);
    }
);

module.exports = router;