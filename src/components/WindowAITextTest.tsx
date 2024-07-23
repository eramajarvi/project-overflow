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
      <div className="window mt-32 absolute" style={{ width: "500px"}}>
        <div className="title-bar">
          <div className="title-bar-text">
            Ahora t̶e̶n̷g̴o̴ t̵̠̀o̴͚̚d̷̖̓ó̸̫ş̶̒ ț̸͇̆̌̀ủ̸͈̟̼͠s̸̯͆ͅ ̸͍̻̯̊̋͗r̴͐ͅe̴͈͂ć̸̹͗̈u̴͈͖͂̊̀ṟ̷͍̜͒s̸̜̐͜ͅo̷̹̘̓̅ś̴̢̟͖
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
                await complete("Crea un cuento corto sobre la situación actual de la humanidad");
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
