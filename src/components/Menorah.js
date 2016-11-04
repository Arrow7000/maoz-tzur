import React from 'react';
import './Menorah.css';

function Menorah() {
    return (
        <div className="Menorah">
            <img className="Menorah__image" src="menorah-icon-fullsize.png" alt="Menorah" />
            {false && <canvas className="Menorah__canvas" id="menorah"></canvas>}
        </div>
    )
}

export default Menorah;