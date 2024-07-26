import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import WarningWindow from "../assets/exclamation.png";


function LoginWindow({ authProps, waitingProps, visibilityProps, shaderVisibility }) {
  const nodeRef = React.useRef(null);

  const { isLoggedIn, setIsLoggedIn } = authProps;
  const { isWaiting, setIsWaiting } = waitingProps;
  const { isVisible, setIsVisible} = visibilityProps;
  const { isShaderVisible, setIsShaderVisible} = shaderVisibility;

  return isLoggedIn ? null : (
    <Draggable
      handle="#login-window-title-bar"
      nodeRef={nodeRef}
      positionOffset={{ x: "0%", y: "20%" }}
    >
      <div
        ref={nodeRef}
        className="window mt-32"
        style={{ width: "550px" }}
      >
        <div className="title-bar" id="login-window-title-bar">
          <div className="title-bar-text">
            Bienvenido a ｓｅｇｍｅｎｔａｔｉｏｎｆａｕｌｔ
          </div>
          <div className="title-bar-controls">
            <button aria-label="Help" />
            <button aria-label="Close" onClick={() => setIsVisible(true)} />
          </div>
        </div>
        <div className="window-body flex justify-around">
          <div className="place-content-start mt-1">
            <img
              className="pixelated h-12 w-12"
              src={WarningWindow.src}
              alt="Password icon to log in into Windows"
            />
          </div>
          <div>
            <p>Ingrese sus credenciales para iniciar sesión</p>
            <div className="mt-3">
              <div
                className="field-row justify-between"
                style={{ width: "200px" }}
              >
                <label htmlFor="text18">
                  <p className="keyBind">Usuario:</p>
                </label>

                <input
                  className="self-end"
                  id="text18"
                  type="text"
                  disabled
                  value="Admin"
                />
              </div>

              <div className="field-row justify-end" style={{ width: "200px" }}>
                <label htmlFor="text19">
                  <p className="keyBind">Contraseña:</p>
                </label>
                <input
                  className="self-end"
                  id="text19"
                  type="password"
                  placeholder="*********************"
                />
              </div>

              <div>
                <p className="explainerOnLogin italic text-[10px] mt-2.5">
                  La contraseña es su API Key de Google.
                </p>

                <p className="explainerOnLogin italic text-[10px] -mt-1">
                  Pero no la necesito.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button
              className="mt-1 keyBind"
              id="loginButton"
              onClick={() => {
                setTimeout(() => {
                  // Hacer que el cursor simule una carga ? 
                }, 2500);
                setIsShaderVisible(true)
                setIsWaiting("cursor-wait");
                setIsLoggedIn(true);
              }}
            >
              OK
            </button>
            <button className="mt-1 keyBind" disabled>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default LoginWindow;
