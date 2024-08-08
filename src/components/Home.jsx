import React, { useEffect, useState } from "react";
import "../scss/Home.scss";
import left from '../assets/homimg/Back.svg';
import right from '../assets/homimg/Forward.svg';
import { NavLink } from "react-router-dom";
import YourTop from "./YourTop";
import Made from "./made/Made";
import Recently from "./Recently ";
import Jump from "./Jump";
import Uniquely from "./Uniquely";
import Leki from "../components/Leki";
import Loading from "../components/loading/Loading"; 
const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true); 
  const ClientID = "fb5f64396c3a493fba57ebb3e6007485";
  const ClientSecret = "eb2fbf0211b8454192dedb3581956e2a";
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const playlistsUrl = "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists";

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
      console.log(data);

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

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlayLists();
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="hom">
      <div className="but">
        <NavLink to="/likes">
          <img src={left} alt="Previous" />
        </NavLink>
        <NavLink to="/">
          <img src={right} alt="Next" />
        </NavLink>
      </div>
      <h2>Good afternoon</h2>
      <div className="mapi">
        {playlists.map((playlist) => (
          <NavLink key={playlist.id} to={`/playlist/${playlist.id}`}>
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
    </div>
  );
};

export default Home;
