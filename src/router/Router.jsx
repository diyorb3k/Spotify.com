import Saidbarleft from "../components/Saidbarleft";
import Saidbarright from "../components/Saidbarright";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Leki from "../components/Leki";
import Playlest from "../components/playlist/Playlest";
import YourTop from "../components/YourTop";
import "./index.scss";

const Router = () => {
  return (
    <>
      <div className="APROUTER">
        <Saidbarleft />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Leki />} />
          <Route path="/playlist/:id" element={<Playlest />} />
          {/* <Route path="/albom/playles/:id" /> */}
        </Routes>
        <Saidbarright />
      </div>
    </>
  );
};

export default Router;
