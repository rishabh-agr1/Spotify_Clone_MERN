import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
});

export default songContext;

/* We are using react-context to play music independent of route, that means 
even if we change the route of site after playing, the song must not stop
basically, we are making the state of song, a global entity*/