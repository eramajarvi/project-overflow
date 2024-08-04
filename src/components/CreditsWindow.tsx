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
                    <a href="https://p5js.org/" target="_blank">
                      🏠 p5.js página de inicio
                    </a>{" "}
                  </li>

                  <li>
                    <a
                      href="https://github.com/processing/p5.js"
                      target="_blank"
                    >
                      🧑‍💻 p5.js repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a
                      href="https://github.com/processing/p5.js/blob/main/license.txt"
                      target="_blank"
                    >
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
                    <a href="https://p5.glitch.me/" target="_blank">
                      🏠 p5.glitch página de inicio
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/ffd8/p5.glitch" target="_blank">
                      🧑‍💻 p5.glitch repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a
                      href="https://github.com/ffd8/p5.glitch/blob/master/LICENSE"
                      target="_blank"
                    >
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
                    <a href="https://jdan.github.io/98.css/" target="_blank">
                      🏠 98.css página de inicio
                    </a>{" "}
                  </li>

                  <li>
                    <a href="https://github.com/jdan/98.css" target="_blank">
                      🧑‍💻 98.css repositorio de código
                    </a>{" "}
                  </li>

                  <li>
                    <a
                      href="https://github.com/jdan/98.css/blob/main/LICENSE"
                      target="_blank"
                    >
                      📝 98.css licencia
                    </a>{" "}
                  </li>
                </ul>
              </details>

              <details>
                <summary>
                  <strong>sketches de p5 utilizados</strong>
                </summary>
                <ul>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2224141/"
                      target="_blank"
                    >
                      Breath Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/445311"
                      target="_blank"
                    >
                      Cardiod Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2187608"
                      target="_blank"
                    >
                      Cilinder Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2215521/"
                      target="_blank"
                    >
                      Letters from My Mother Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1297329"
                      target="_blank"
                    >
                      Loud Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1803918"
                      target="_blank"
                    >
                      Malagua Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1820759"
                      target="_blank"
                    >
                      90s Math Texbook Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2084721"
                      target="_blank"
                    >
                      Pink Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1803325"
                      target="_blank"
                    >
                      SpyderWeb Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2225715/"
                      target="_blank"
                    >
                      Word Cloud Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1925074"
                      target="_blank"
                    >
                      Word Salad Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/1798634"
                      target="_blank"
                    >
                      Xubitos Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/sketch/2087724"
                      target="_blank"
                    >
                      Yarn Sketch
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://openprocessing.org/user/293890"
                      target="_blank"
                    >
                      Shaders de fondo usados - por Samuel YAN
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
