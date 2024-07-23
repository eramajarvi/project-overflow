import React, { useRef } from 'react';
import "98.css";
import "../styles/global.css";
import { useCompletion } from "ai/react";

export default function WindowAITextTest() {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div>
      <div className="window mt-32 absolute" style={{ width: "500px", top: Math.floor(Math.random()*700), left: Math.floor(Math.random()*500)}}>
        <div className="title-bar">
          <div className="title-bar-text">
            Inteligencia Articial está escribiendo...
          </div>

          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>

        <div className="window-body flex">
          <div className="place-content-start mt-1">
            <p>Aquí va lo que dice la IA</p>
            <button
              onClick={async () => {
                await complete("Why is the sky blue?");
              }}
            >
              Responder
            </button>
          </div>

          {completion}
        </div>
      </div>
    </div>
  );
}
