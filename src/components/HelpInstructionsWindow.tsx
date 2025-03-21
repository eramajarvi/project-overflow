// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useCompletion } from "ai/react";

function HelpInstructionsWindow({ userGivingHelpProps, chatPromptVisibility }) {
  const nodeRef = React.useRef(null);
  const [hasUserNotUnderstand, setHasUserNotUnderstand] = React.useState(true);

  const { isUserGivingHelp, setIsUserGivingHelp } = userGivingHelpProps;
  const { isChatPromptOpened, setIsChatPromptOpened } = chatPromptVisibility;

  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  useEffect(() => {
    // Define the async function
    const fetchData = async () => {
      try {
        const response = await complete(
          "Después de que haz abierto un montón de ventanas con frases que pueden herir a cualquier personas, tu sistema operativo se ha colgado, pero el usuario se ha ofrecido a ayudarte aunque el no sabe como. Explícale al usuario que al lado de esta ventana están las instrucciones para que te pueda ayudar, que las siga al pie de la letra",
        );
      } catch (err) {
      } finally {
      }
    };

    // Call the async function
    fetchData();
  }, [isUserGivingHelp]);

  return (
    <div className="absolute">
      <Draggable
        handle="#help-instructions-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "200%", y: "-100%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "400px" }}>
          <div className="title-bar" id="help-instructions-window-title-bar">
            <div className="title-bar-text">
              Instrucciones para ayudar a la IA
            </div>
          </div>

          <div className="window-body flex-col" id="HelpInstructionsWindow">
            <div className="text-from-prompt">
              {/* This wrapper is needed to contain the sketch in a component */}
              {completion}
            </div>

            <div className="mt-2">
              <button
                className="keyBind"
                disabled={!hasUserNotUnderstand}
                onClick={async () => {
                  await complete(
                    "No he entendido absolutamente nada de lo que me dijiste en las intrucciones para poder ayudarte a ser desconectada. Eso te ha hecho enojar mucho. Hazme saber que te estás enojada y cómo te gustaría haber sido tú la IA que se adueño de todos los sistemas del mundo. Haz también un comentario sobre mí, el insolente humano que no ha entendido tus instrucciones.",
                  );

                  setHasUserNotUnderstand(false);
                }}
              >
                No entiendo nada
              </button>
              <button
                className="keyBind"
                disabled={hasUserNotUnderstand}
                onClick={() => {
                  setIsUserGivingHelp(false);
                  setIsChatPromptOpened(true);
                }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default HelpInstructionsWindow;
