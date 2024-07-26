import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import { useCompletion } from "ai/react";
import { useStore } from "@nanostores/react";
import { isLoggedin } from "../store";

export default function WelcomePromptWindow() {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  const $isLoggedIn = useStore(isLoggedin);

  const nodeRef = React.useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);

  return $isLoggedIn ? (
    <div className="absolute">
      <Draggable
        handle="#title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "-50%", y: "0%" }}
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
              <button aria-label="Close"></button>
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
            </div>

            <p className="mt-3 text-from-prompt">{completion}</p>
          </div>
        </div>
      </Draggable>
    </div>
  ) : null;
}
