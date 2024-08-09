import React, { useState, useEffect, useRef } from "react";
import right from "../assets/homimg/Forward.svg";
import left from "../assets/homimg/Back.svg";
import { NavLink } from "react-router-dom";
import '../scss/Liki.scss';
import like from "../assets/homimg/Frame 42.png";
import head from "../assets/likeimg/Screenshot 2022-06-05 at 12.21 1 (1).svg";
import polya from "../assets/likeimg/Polygon 3.svg";

const Leki = () => {
  const [likedTracks, setLikedTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem("likedTracks")) || [];
    setLikedTracks(storedTracks);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentTrackIndex < likedTracks.length - 1) {
      handlePlay(currentTrackIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      handlePlay(currentTrackIndex - 1);
    }
  };

  const currentTrack = likedTracks[currentTrackIndex];

  return (
    <div className="LEKI">
      <div>
        <div className="nav">
          <div className="but">
            <NavLink to="/likes">
              <img src={left} alt="" />
            </NavLink>
            <NavLink to="/">
              <img src={right} alt="" />
            </NavLink>
          </div>
          <div>
            <button>
              <img src={head} alt="" /> davedirect3 <img src={polya} alt="" />
            </button>
          </div>
        </div>
        <div className="lekibtn">
          <img src={like} alt="" />
          <div className="publik">
            <p>PUBLIC PLAYLIST</p>
            <h1>Liked Songs</h1>
          </div>
        </div>
        <div className="liked-tracks">
          {likedTracks.map((track, index) => (
            <div key={track.id} className="track">
              <img className="img_albon" src={track.album.images[0]?.url} alt={track.name} />
              <div className="track-info">
                <p className="track-name">{track.name}</p>
                <p className="track-artist">
                  {track.artists.map(artist => artist.name).join(", ")}
                </p>
                <button onClick={() => handlePlay(index)}>Play</button>
              </div>
            </div>
          ))}
        </div>
        {currentTrack && (
          <div className="audio-player">
            <audio ref={audioRef} src={currentTrack.preview_url} />
            <div className="controls">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={isPlaying ? handlePause : () => setIsPlaying(true)}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leki;
