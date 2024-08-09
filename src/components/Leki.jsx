import React from "react";
import right from "../assets/homimg/Forward.svg";
import left from "../assets/homimg/Back.svg";
import { NavLink } from "react-router-dom";
import "../scss/Liki.scss";
import like from "../assets/homimg/Frame 42.png";
import head from "../assets/likeimg/Screenshot 2022-06-05 at 12.21 1 (1).svg";
import polya from "../assets/likeimg/Polygon 3.svg";
import useStore from '../store/useStore'; // Import the store
import './playlist/Playlist.scss'

const Leki = () => {
  const { likedTracks } = useStore(); // Use the store to get liked tracks

  return (
    <div className="LEKI">
      <div>
        <div className="nav">
          <div className="but">
            <NavLink to="/likes">
              <img src={left} alt="Back" />
            </NavLink>
            <NavLink to="/">
              <img src={right} alt="Forward" />
            </NavLink>
          </div>
          <div>
            <button>
              <img src={head} alt="Profile" /> davedirect3 <img src={polya} alt="Arrow" />
            </button>
          </div>
        </div>
        <div className="lekibtn">
          <img src={like} alt="Like" />
          <div className="publik">
            <p>PUBLIC PLAYLIST</p>
            <h1>Liked Songs</h1>
          </div>
        </div>
        <div className="liked-songs">
          {likedTracks.length === 0 ? (
            <p>No liked songs yet.</p>
          ) : (
            <ul>
              {likedTracks.map((track) => (
                <li key={track.id}>
                  <img src={track.album.images[0]?.url} alt={track.name} />
                  <div>
                    <p>{track.name}</p>
                    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leki;
