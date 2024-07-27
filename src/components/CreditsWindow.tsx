import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import CreditsIcon from "../assets/windows.png";

function CreditsWindow({ creditsWindowVisibility }) {
  const nodeRef = React.useRef(null);

  const { isCreditsWindowVisible, setIsCreditsWindowVisible } =
    creditsWindowVisibility;

  return (
    <Draggable
      handle="#credits-window-title-bar"
      nodeRef={nodeRef}
      positionOffset={{ x: "20%", y: "30%" }}
    >
      <div ref={nodeRef} className="window" style={{ width: "400px" }}>
        <div className="title-bar" id="credits-window-title-bar">
          <div className="title-bar-text">Créditos</div>
          <div className="title-bar-controls">
            <button
              aria-label="Close"
              onClick={() => setIsCreditsWindowVisible(false)}
            />
          </div>
        </div>

        <div className="window-body flex justify-start">
          <img
            className="pixelated h-8 w-8 mt-2 mr-2"
            src={CreditsIcon.src}
            alt="Computer icon"
          />
          <div className="ml-2">
            <p className="mb-2">
              Este proyecto se ha construído con herramientas de código abierto.
              Todos los créditos van para sus respectivos autores y sus
              licencias asignadas.{" "}
            </p>

            <p className="mb-2">
              <strong>James Perez</strong> <i>@eramajarvi</i> —–{" "}
              <a
                href="https://github.com/eramajarvi/project-overflow"
                target="_blank"
              >
                {" "}
                Ver código fuente
              </a>{" "}
            </p>

            <ul className="tree-view">
              <details>
                <summary>
                  <strong>p5.js</strong>
                </summary>
                <ul>
                  <li>
                    <a href="https://p5js.org/">🏠 p5.js página de inicio</a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/processing/p5.js">
                      🧑‍💻 p5.js repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/processing/p5.js/blob/main/license.txt">
                      📝 p5.js licencia
                    </a>{" "}
                  </li>
                </ul>
              </details>

              <details>
                <summary>
                  <strong>p5.glitch</strong>
                </summary>
                <ul>
                  <li>
                    <a href="https://p5.glitch.me/">
                      🏠 p5.glitch página de inicio
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/ffd8/p5.glitch">
                      🧑‍💻 p5.glitch repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/ffd8/p5.glitch/blob/master/LICENSE">
                      📝 p5.glitch licencia
                    </a>{" "}
                  </li>
                </ul>
              </details>

              <details>
                <summary>
                  <strong>98.css</strong>
                </summary>
                <ul>
                  <li>
                    <a href="https://jdan.github.io/98.css/">
                      🏠 98.css página de inicio
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/jdan/98.css">
                      🧑‍💻 98.css repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/jdan/98.css/blob/main/LICENSE">
                      📝 98.css licencia
                    </a>{" "}
                  </li>
                </ul>
              </details>
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default CreditsWindow;
