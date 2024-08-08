import React from "react";
import right from "../assets/homimg/Forward.svg";
import left from "../assets/homimg/Back.svg";
import { NavLink } from "react-router-dom";
import "../scss/Liki.scss";
import like from "../assets/homimg/Frame 42.png";
import head from "../assets/likeimg/Screenshot 2022-06-05 at 12.21 1 (1).svg";
import polya from "../assets/likeimg/Polygon 3.svg";

const Leki = () => {
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
      </div>
    </div>
  );
};

export default Leki;
