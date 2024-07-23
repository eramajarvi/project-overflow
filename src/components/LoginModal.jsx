import React from "react";
import "98.css";
import "../styles/global.css";

import passwordIcon from "../assets/password.png";

export default function LoginModal() {
  return (
    <>
      <div className="window mt-32" style={{ width: "500px" }}>
        <div className="title-bar">
          <div className="title-bar-text">
            Bienvenido a ｓｅｇｍｅｎｔａｔｉｏｎｆａｕｌｔ
          </div>
          <div className="title-bar-controls">
            <button aria-label="Help"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body flex justify-around">
          <div className="place-content-start mt-1">
            <img
              className="pixelated h-12 w-12"
              src={passwordIcon.src}
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
                  La contraseña es tu API Key de Google.
                </p>

                <p className="explainerOnLogin italic text-[10px] -mt-1">
                  Pero ya la tengo en mi sistema
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button
              className="mt-1 keyBind"
              onClick={() => console.log(crypto.randomUUID())}
            >
              OK
            </button>
            <button className="mt-1 keyBind" disabled>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
