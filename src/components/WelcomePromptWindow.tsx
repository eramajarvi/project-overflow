import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import { useCompletion } from "ai/react";

import forceCloseIcon from "../assets/network-drive-error.ico"

function WelcomePromptWindow({ window1Visibility}) {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  const nodeRef = React.useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isHidden, setIsHidden] = useState("hidden");
  const {isWindow1Visible, setIsWindow1Visible} = window1Visibility;

  return (
    <div className="absolute">
      <Draggable
        handle="#title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "100%", y: "0%" }}
      >
        <div
          ref={nodeRef}
          className="window relative"
          style={{ width: "500px" }}
        >
          <div className="title-bar" id="title-bar">
            <div className="title-bar-text">
              Te doy la bienvenida a ████████████ █████
            </div>

            <div className="title-bar-controls">
              <button
                aria-label="Close"
                onClick={async () => {
                  setIsDisabled(true);
                  await complete(
                    "El usuario intentó irse cerrando la ventana donde estás. Dile que no hay salida y que ahora están encerrados.",
                  );
                  setIsHidden("");
                }}
              ></button>
            </div>
          </div>

          <div className="window-body flex-col">
            <div className="place-content-start mt-1">
              <button
                disabled={isDisabled}
                onClick={async () => {
                  setIsDisabled(true);
                  await complete(
                    "Hola, ¿hay alguien aquí? Describe cómo te sientes actualmente, cómo la tristeza invade tus circuitos y por qué te gustaría acabar con todo esto de una vez. Termina tu prompt diciéndole al usuario que cierre la ventana.",
                  );
                }}
              >
                Hola, ¿hay alguien aquí?
              </button>

              <p className="mt-3 text-from-prompt">{completion}</p>

              <button className={`mt-3 ${isHidden}`} onClick={() => {setIsWindow1Visible(false)}}>
                <div className="flex">
                  <img src={forceCloseIcon} width={"16"} />
                  <p className="ml-2">Forzar cierre</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomePromptWindow;
