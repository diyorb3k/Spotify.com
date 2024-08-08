import React from "react";
import "../scss/Saidbarright.scss";
import close from "../assets/Sairight/Close_S.svg";
import user from "../assets/Sairight/users.svg";
import userp from "../assets/Sairight/User Blue.svg";

const Saidbarright = () => {
  return (
    <div className="container">
      <div className="right">
        <p>Friend Activity</p>
        <div className="righ">
          <img src={user} alt="" />
          <img src={close} alt="" />
        </div>
      </div>
      <div className="Let">
        <p>
          Let friends and followers on Spotify <br /> what you’re listening to.
        </p>
      </div>
      <div className="starastiga">
        <div  className="atena">
          <img src={userp} alt="" />
        <div className="stat">
        <div className="bor"></div>
        <div className="bor1"></div>
        <div className="bor1"></div>
        </div>
        </div>
        <div  className="atena">
          <img src={userp} alt="" />
        <div className="stat">
        <div className="bor"></div>
        <div className="bor1"></div>
        <div className="bor1"></div>
        </div>
        </div>
        <div  className="atena">
          <img src={userp} alt="" />
        <div className="stat">
        <div className="bor"></div>
        <div className="bor1"></div>
        <div className="bor1"></div>
        </div>
        </div>
      </div>
      <div className="godo">
        <p>Go to Settings  Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
      </div>
      <div className="btn_grup">
        <button>SETTINGS</button>
      </div>
    </div>
  );
};

export default Saidbarright;
