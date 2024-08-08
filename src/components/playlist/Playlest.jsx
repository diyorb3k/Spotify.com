import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";
import { useParams, NavLink } from "react-router-dom";
import "../playlist/Playlist.scss";
import Loading from "../loading/Loading"; // Import the Loading component
import left from "../../assets/homimg/Back.svg";
import right from "../../assets/homimg/Forward.svg";
import Mex from "../../assets/Playlistingimg/Screenshot 2022-06-04 at 20.09.png";
import img1 from "../../assets/Playlistingimg/Heart_XS.svg";
import img2 from "../../assets/Playlistingimg/Play_Greem Hover (1).svg";
import img3 from "../../assets/Playlistingimg/Download_XS.svg";
import img4 from "../../assets/Playlistingimg/Union.svg";
import img5 from "../../assets/Playlistingimg/Search_S (1).svg";
import img6 from "../../assets/Playlistingimg/Frame 12.svg";

// Create a context for audio management
const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const playlistUrl = `https://api.spotify.com/v1/playlists/${id}`;

  const getToken = async () => {
    try {
      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            "fb5f64396c3a493fba57ebb3e6007485:eb2fbf0211b8454192dedb3581956e2a"
          )}`,
        },
        body: "grant_type=client_credentials",
      });
      const data = await res.json();
      const token = `${data.token_type} ${data.access_token}`;
      localStorage.setItem("asset_token", token);
    } catch (err) {
      console.log("Error fetching token:", err);
    }
  };

  const getPlaylist = async () => {
    const token = localStorage.getItem("asset_token");
    if (!token) return;

    try {
      const res = await fetch(playlistUrl, {
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setPlaylist(data);
    } catch (err) {
      console.log("Error fetching playlist:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlaylist();
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  const handlePlay = (index) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause current track
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (playlist && currentTrackIndex < playlist.tracks.items.length - 1) {
      handlePlay(currentTrackIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (playlist && currentTrackIndex > 0) {
      handlePlay(currentTrackIndex - 1);
    }
  };

  if (!playlist) return <Loading />; // Show the loading component

  const currentTrack = playlist.tracks.items[currentTrackIndex]?.track;
  const truncatedName =
    playlist.name.length > 10
      ? playlist.name.slice(0, 8) + "..."
      : playlist.name;

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        isPlaying,
        setIsPlaying,
        audioRef,
      }}
    >
      <div className="bagroun">
        <div className="but">
          <NavLink to="/likes">
            <img src={left} alt="Previous" />
          </NavLink>
          <NavLink to="/">
            <img src={right} alt="Next" />
          </NavLink>
        </div>
        <div className="chixi">
          <img
            className="hom_img"
            src={playlist.images[0]?.url || Mex}
            alt="Playlist"
          />
          <div className="chixi_tex">
            <div className="texx">
              <span className="public">PUBLIC PLAYLIST</span>
              <h2 className="mpz_name">{truncatedName}</h2>
            </div>
            <p className="wolf">{playlist.description}</p>
            <div className="made">
              <p className="for">Made for {playlist.owner.display_name}</p>
              <p>+</p>
              <p className="song">{playlist.tracks.total} songs</p>
            </div>
          </div>
        </div>
        <div className="herro">
          <div className="left">
            <img className="img1" src={img2} alt="Play" />
         <NavLink to="/likes"><img className="img2" src={img1} alt="Heart" /></NavLink>
            <img className="img3" src={img3} alt="Download" />
            <img className="img4" src={img4} alt="Union" />
          </div>
          <div className="right">
            <img src={img5} alt="Search" />
            <span>Custom order</span>
            <img src={img6} alt="Frame" />
          </div>
        </div>
        <div className="mapi">
          <table className="track-table">
            <thead className="hro">
              <tr>
                <th className="albo"># TITLE</th>
                <th className="albo"></th>
                <th className="albUM">Album</th>
                <th className="albo">Action</th>
              </tr>
            </thead>
            <tbody>
              {playlist.tracks.items.slice(0, 18).map((track, index) => (
                <tr key={track.track.id}>
                  <td>
                    <img
                      className="img_albon"
                      src={track.track.album.images[0]?.url}
                      alt={track.track.name}
                    />
                  </td>
                  <td>
                    <div className="manio">
                      <p className="tcak_name">{track.track.name}</p>
                      <p className="artic_name">
                        {track.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="durat">
                      <p>{track.track.album.name}</p>
                    </div>
                  </td>
                  <td className="taga">
                    <p className="duration">
                      {millisToMinutesAndSeconds(track.track.duration_ms)}
                    </p>
                    <button onClick={() => handlePlay(index)}>Play</button>
                    <button class="btn">
                      <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.503"
                        height="20.625"
                        viewBox="0 0 17.503 15.625"
                      >
                        <path
                          id="Fill"
                          d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                          transform="translate(0 0)"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentTrack && (
          <div className="audio-player">
            <audio ref={audioRef} src={currentTrack.preview_url} controls />
            <div className="controls">
              <button onClick={handlePrevious}>Previous</button>
              <button
                onClick={isPlaying ? handlePause : () => setIsPlaying(true)}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
      </div>
    </AudioContext.Provider>
  );
};

export default Playlist;
