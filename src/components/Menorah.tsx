import React from "react";
import "./Menorah.css";
import menorah from "../../public/menorah-icon-fullsize.png";

function Menorah() {
  return (
    <div className="Menorah">
      <img className="Menorah__image" src={menorah} alt="Menorah" />
      {false && <canvas className="Menorah__canvas" id="menorah" />}
    </div>
  );
}

export default Menorah;
