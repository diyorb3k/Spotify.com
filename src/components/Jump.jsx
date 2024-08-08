import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // NavLink import qilamiz
import "../scss/YourTop.scss";

const Jump = () => {
  const [playlists, setPlaylists] = useState([]);
  const ClientID = "fb5f64396c3a493fba57ebb3e6007485";
  const ClientSecret = "eb2fbf0211b8454192dedb3581956e2a";
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const playlistsUrl =
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists";

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
      localStorage.setItem(
        "asset_token",
        `${data.token_type} ${data.access_token}`
      );
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

      const data = await res.json();
      console.log("Fetched data:", data);

      if (data.playlists && data.playlists.items) {
        setPlaylists(data.playlists.items.slice(0, 4)); // Faqat 4 ta natija olish uchun slice metodi
      } else {
        console.log("Playlists or items not found in response:", data);
      }
    } catch (err) {
      console.log("Error fetching playlists:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlayLists();
    };
    fetchData();
  }, []);

  return (
    <div className="your">
      <div className="top">
        <h2>Jump back in</h2>
        <p>SEE ALL</p>
      </div>
      <div className="music">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`} // Playlist componentiga yo'naltiradi
              className="playlist-link" // Ixtiyoriy: styling uchun class qo'shish mumkin
            >
              <ul>
                <li>
                  <img
                    className="img_card"
                    src={playlist.images[0].url}
                    alt={playlist.name}
                  />
                </li>
                <li className="name">
                  {playlist.name.length > 10
                    ? playlist.name.substring(0, 7) + "..."
                    : playlist.name}
                </li>
                <p className="descr">{playlist.description}</p>
              </ul>
            </NavLink>
          ))
        ) : (
          <p>No playlists found</p>
        )}
      </div>
    </div>
  );
};

export default Jump;
