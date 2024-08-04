// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import PasswordIcon from "../assets/password.png";

function SettingsWindow({ SettingsWindowVisibility, shaderVisibility }) {
  const nodeRef = React.useRef(null);

  const { isSettingsWindowOpened, setIsSettingsWindowOpened } =
    SettingsWindowVisibility;

  const { isShaderVisible, setIsShaderVisible } = shaderVisibility;

  return (
    <div className="absolute">
      <Draggable
        handle="#settings-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: window.innerWidth / 2 - 150, y: "100%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "350px" }}>
          <div className="title-bar" id="settings-window-title-bar">
            <div className="title-bar-text">Ayuda del sistema</div>
            <div className="title-bar-controls">
              <button
                aria-label="Close"
                onClick={() => setIsSettingsWindowOpened(false)}
              />
            </div>
          </div>

          <div className="window-body flex-col justify-normal">
            <p>Por favor ayuda a la IA a recapacitar usando la dialéctica.</p>

            <div>
              <fieldset className="fieldset-fix">
                <legend>Fondo animado</legend>
                <div className="field-row">
                  <input id="radio13" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio13">Activado</label>
                </div>

                <div className="field-row">
                  <input id="radio14" type="radio" name="fieldset-example2" />
                  <label htmlFor="radio14">Desactivado</label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default SettingsWindow;
