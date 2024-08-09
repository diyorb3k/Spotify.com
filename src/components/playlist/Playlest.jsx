// Playlist.jsx

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import "../playlist/Playlist.scss";
import Loading from "../loading/Loading";
import left from "../../assets/homimg/Back.svg";
import right from "../../assets/homimg/Forward.svg";
import Mex from "../../assets/Playlistingimg/Screenshot 2022-06-04 at 20.09.png";
import img1 from "../../assets/Playlistingimg/Heart_XS.svg";
import img2 from "../../assets/Playlistingimg/Play_Greem Hover (1).svg";
import img3 from "../../assets/Playlistingimg/Download_XS.svg";
import img4 from "../../assets/Playlistingimg/Union.svg";
import img5 from "../../assets/Playlistingimg/Search_S (1).svg";
import img6 from "../../assets/Playlistingimg/Frame 12.svg";
import useStore from '../../store/useStore'; // Import the store

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { likedTracks, toggleLike } = useStore(); // Use the store

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
      audioRef.current.pause(); 
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

  if (!playlist) return <Loading />; 

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

  const handleLike = (track) => {
    toggleLike(track); // Saqlash uchun toggleLike funksiyasini chaqirish
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
                    <button className="btn" onClick={() => handleLike(track.track)}>
                      {likedTracks.some((likedTrack) => likedTrack.id === track.track.id) ? "Unlike" : "Like"}
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
              <button className="btn" onClick={() => handleLike(track.track)}>
  {likedTracks.some((likedTrack) => likedTrack.id === track.track.id) ? "Unlike" : "Like"}
</button>

            </div>
          </div>
        )}
      </div>
    </AudioContext.Provider>
  );
};

export default Playlist;
