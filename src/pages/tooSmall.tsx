import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import UpdateDriversIcon from "../assets/install-drivers.ico";

function TooSmallWindow() {
  const nodeRef = React.useRef(null);

  return (
    <>
      <div className="crt"></div>
      <div className="absolute">
        <Draggable
          handle="#too-small-window-title-bar"
          nodeRef={nodeRef}
          positionOffset={{ x: "20%", y: "10%" }}
        >
          <div ref={nodeRef} className="window" style={{ width: "300px" }}>
            <div className="title-bar" id="too-small-window-title-bar">
              <div className="title-bar-text">Error</div>
            </div>

            <div className="window-body flex-col justify-start">
              <img src={UpdateDriversIcon} className="pixelated mb-4" />
              <p>
                El █████ de esta pantalla no es compatible. Instale los
                controladores de pantalla necesarios y vuelva a ị̸͑ṉ̴̓t̶̝͗ȅ̸̠n̵͕̑t̵̤͒a̵̟̿r̴̆͜l̶͍͑o̸̤̕.
              </p>
            </div>

            <div className="status-bar">
              <p className="status-bar-field">Ancho actual: NaNpx</p>
              <p className="status-bar-field">Uso de CPU: NaN%</p>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default TooSmallWindow;
