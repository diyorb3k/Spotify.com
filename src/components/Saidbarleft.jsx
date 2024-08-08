import React from "react";
import "../scss/Saidbarleft.scss";
import home from "../assets/Sailef_img/home.svg.svg";
import libray from "../assets/Sailef_img/Library_S.svg";
import seach from "../assets/Sailef_img/seach.svg";
import play from "../assets/Sailef_img/playist.svg";
import lekid from "../assets/Sailef_img/Lekid.svg";
import reklama from "../assets/Sailef_img/reklanm.png";
import { NavLink } from "react-router-dom";

const Saidbarleft = () => {
  return (
    <div className="container">
      <div>
        <div className="Navlink">
          <div className="left">
            <img src={home} alt="" />
            
            <NavLink className={({isActive}) => isActive ? "sidebar-link link-active": "sidebar-link"} to="/">
            <span>Home</span>
            </NavLink>
          </div>
          <div className="left">
            <img src={libray} alt="" />
            <span className="wwid">Search</span>
          </div>
          <div className="left">
            <img src={seach} alt="" />
            <span className="wwid">Your Library</span>
          </div>
          <div className="link">
            <div className="left">
              <img src={play} alt="" />
              <span className="wwid">Create Playlist</span>
            </div>
            <div className="left">
              <img src={lekid} alt="" />
             <NavLink className={({isActive}) => isActive ? "sidebar-link link-active": "sidebar-link"}  to="/likes"> <span>Liked Songs</span></NavLink>
            </div>
          </div>
        </div>
        <div className="border"></div>
        <div className="parent">
          <p>Chill Mix</p>
          <p>Insta Hits</p>
          <p>Your Top Songs 2021</p>
          <p>Mellow Songs</p>
          <p>Anime Lofi & Chillhop Music</p>
          <p>BG Afro “Select” Vibes</p>
          <p>Afro “Select” Vibes</p>
          <p>Happy Hits!</p>
          <p>Deep Focus</p>
          <p>Instrumental Study</p>
          <p>OST Compilations</p>
          <p>Nostalgia for old souled mill...</p>
          <p>Mixed Feelings</p>
        </div>
      </div>
      <img className="reklama" src={reklama} alt="" />
    </div>
  );
};

export default Saidbarleft;
