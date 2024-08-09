import React, { useState, useRef, useEffect } from "react";
import "../scss/Home.scss";
import left from '../assets/homimg/Back.svg';
import right from '../assets/homimg/Forward.svg';
import { NavLink } from "react-router-dom";
import YourTop from "./YourTop";
import Made from "./made/Made";
import Recently from "./Recently "; // Corrected file name
import Jump from "./Jump";
import Uniquely from "./Uniquely";
import Loading from "../components/loading/Loading";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const ClientID = "fb5f64396c3a493fba57ebb3e6007485";
  const ClientSecret = "eb2fbf0211b8454192dedb3581956e2a";
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const playlistsUrl = "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists";

  const getToken = async () => {
    try {
      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(ClientID + ":" + ClientSecret)}`,
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

  const getPlayLists = async () => {
    const token = localStorage.getItem("asset_token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }

    try {
      const res = await fetch(playlistsUrl, {
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setPlaylists(data.playlists.items.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.log("Error fetching playlists:", err);
      setLoading(false);
    }
  };

  const getTracks = async (playlistId) => {
    const token = localStorage.getItem("asset_token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }

    try {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setTracks(data.items.map(item => item.track.preview_url).filter(url => url)); // Filtering out null values
    } catch (err) {
      console.log("Error fetching tracks:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlayLists();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.src = currentTrack; // Ensure the source is set
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handlePlay = (trackUrl) => {
    setCurrentTrack(trackUrl);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    // Implement logic to play the next track
  };

  const handlePrevious = () => {
    // Implement logic to play the previous track
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hom">
      <div className="but">
        <p onClick={() => window.history.back()}>
          <img src={left} alt="Previous" />
        </p>
        <p onClick={() => window.history.forward()}>
          <img src={right} alt="Next" />
        </p>
      </div>
      <h2>Good afternoon</h2>
      <div className="mapi">
        {playlists.map((playlist) => (
          <NavLink
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            onClick={() => getTracks(playlist.id)}
          >
            <ul>
              <div className="ul_data">
                <li className="imgdata">
                  <img src={playlist.images[0].url} alt={playlist.name} />
                </li>
                <li className="name">{playlist.name}</li>
              </div>
            </ul>
          </NavLink>
        ))}
      </div>

      <YourTop />
      <Made />
      <Recently />
      <Jump />
      <Uniquely />

      {/* HTML Audio Player */}
      <div className="audio-player">
        <audio ref={audioRef} controls>
          <source src={currentTrack} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="controls">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={isPlaying ? handlePause : () => handlePlay(currentTrack)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
