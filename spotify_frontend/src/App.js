import "./output.css";
import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import {useCookies} from "react-cookie";
import songContext from "./contexts/songContext";

function App() {
    const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [cookie, setCookie] = useCookies(["token"]);

    return (
        <div className="w-screen h-screen font-poppins">
            <BrowserRouter>
                {cookie.token ? (
                    // logged in routes
                    // we dont want user to access log in and sign up page if they are already loged-in
                    <songContext.Provider
                        value={{
                            currentSong,
                            setCurrentSong,
                            soundPlayed,
                            setSoundPlayed,
                            isPaused,
                            setIsPaused,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<HelloComponent />} />
                            {/* If the user is logged in, they will be routed to this Component 
                            rather than normal "HomeComponent" */}
                            <Route
                                path="/home"
                                element={<LoggedInHomeComponent />}
                            />
                            <Route
                                path="/uploadSong"
                                element={<UploadSong />}
                            />
                            <Route path="/myMusic" element={<MyMusic />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/library" element={<Library />} />
                            <Route
                                path="/playlist/:playlistId"
                                element={<SinglePlaylistView />}
                            />
                            {/* The following line of code means that, if user browses to any routes
                            other than mentioned above, by default send them to home page, 
                            we could have also shown ERROR 404 Page */}
                            <Route path="*" element={<Navigate to="/home" />} />
                        </Routes>
                    </songContext.Provider>
                ) : (
                    // logged out routes
                    // we dont want user to access rest of the routes if they havent loged in yet
                    <Routes>
                        <Route path="/home" element={<HomeComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/signup" element={<SignupComponent />} />
                        {/* The following line of code means that, if user browses to any routes
                            other than mentioned above, by default send them to login page, 
                            we could have also shown ERROR 404 Page */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )} 
            </BrowserRouter>
        </div>
    );
}

const HelloComponent = () => {
    return <div>This is hello from component</div>;
};

export default App;