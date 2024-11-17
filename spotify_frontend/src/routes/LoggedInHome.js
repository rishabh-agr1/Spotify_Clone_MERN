import {useState} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import LoggedInContainer from "../containers/LoggedInContainer";

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "Liked Songs",
        description: "Relax and indulge with your favourite songs",
        imgUrl: "https://img.freepik.com/free-photo/portrait-young-girl-listening-music_23-2149238399.jpg?ga=GA1.1.666281868.1722316576&semt=ais_hybrid",
    },
    {
        title: "The Weeknd",
        description: "Enjoy your this weekend with 'THE WEEKND'",
        imgUrl: "https://media.gettyimages.com/id/1448719380/photo/hollywood-california-the-weeknd-attends-20th-century-studios-avatar-2-the-way-of-water-u-s.jpg?s=612x612&w=0&k=20&c=RYJKyewxpzO4xaqWnDfNyEclRqrKZaeadM-6zhgb6lM=",
    },
    {
        title: "Non-Stop Arijit Singh",
        description: "Because who doesn't love Arijit Singh",
        imgUrl: "https://wallpapers.com/images/high/arijit-singh-cute-snapshot-on-stage-q307hnimzo1z26ct.webp",
    },
    {
        title: "Best of Vishal-Shekhar",
        description: "From the one of the Best-Duo in Bollywood",
        imgUrl: "https://media.gettyimages.com/id/90511863/photo/india-vishal-with-shekhar-music-director-of-bollywood-in-mumbai-maharashtra-india.jpg?s=612x612&w=0&k=20&c=3x3hfYxRyD3nlpBABXwMAfHp2d4Ac84Ieg6KyjveTEY=",
    },
    {
        title: "Bollywood Party Songs",
        description: "You just arrange the speakers",
        imgUrl: "https://images.unsplash.com/photo-1442504028989-ab58b5f29a4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWMlMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D",
    },
];

const soundOfIndiaCardData = [
    {
        title: "Liked Songs",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://media.istockphoto.com/id/1293306688/photo/wooden-musical-instrument-harmonium.jpg?s=612x612&w=0&k=20&c=OKmWoSShZp8BdqwRmDT4ZxQ5ZzvAF6aTvcJgPw-Fa_c=",
    },
    {
        title: "K-POP",
        description: "Keep calm and focus with this music",
        imgUrl: "https://img.freepik.com/premium-photo/music-99_573563-4798.jpg?ga=GA1.1.666281868.1722316576&semt=ais_hybrid",
    },
    {
        title: "Non-Stop Arijit Singh",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.pexels.com/photos/2064505/pexels-photo-2064505.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Best of Vishal-Shekhar",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.pexels.com/photos/974320/pexels-photo-974320.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        title: "Bollywood Party Songs",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
];

const Home = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <PlaylistView titleText="Spotify Playlist" cardsData={spotifyPlaylistsCardData} />
            <PlaylistView
                titleText="Sound of India"
                cardsData={soundOfIndiaCardData}
            />
            <PlaylistView
                titleText="Focus"
                cardsData={focusCardsData}
            />
        </LoggedInContainer>
    );
};

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Home;