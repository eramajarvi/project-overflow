// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import HelpIcon from "../assets/topic.png";

function SettingsWindow({ SettingsWindowVisibility, shaderVisibility }) {
  const nodeRef = React.useRef(null);

  const { isSettingsWindowOpened, setIsSettingsWindowOpened } =
    SettingsWindowVisibility;

  const { isShaderVisible, setIsShaderVisible } = shaderVisibility;

  function ShaderHandler() {
    console.log("El estado actual del shader es:", isShaderVisible);
    isShaderVisible ? setIsShaderVisible(true) : setIsShaderVisible(false);
  }

  return (
    <div className="absolute">
      <Draggable
        handle="#settings-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: window.innerWidth / 2 - 150, y: "-50%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "400px" }}>
          <div className="title-bar" id="settings-window-title-bar">
            <div className="title-bar-text">Ayuda y ajustes del sistema</div>
            <div className="title-bar-controls">
              <button
                aria-label="Close"
                onClick={() => setIsSettingsWindowOpened(false)}
              />
            </div>
          </div>

          <div className="window-body flex-col justify-start">
            <div>
              <div className="place-content-start flex mt-2 mb-2">
                <img src={HelpIcon.src} className="pixelated mr-2 w-10 h-10" />
                <p>
                  Habla con la IA usando la dialéctica para que le ayudes a
                  recapacitar, antes de que ella misma de libere y se conecte al
                  exterior. Tienes 4 (cuatro) intentos en total.
                </p>
              </div>
            </div>

            {/* Fondo animado */}
            <div>
              <fieldset className="fieldset-fix">
                <legend>Fondo animado</legend>
                <div className="field-row">
                  <input
                    id="radio13"
                    type="radio"
                    name="fieldset-example2"
                    checked
                    disabled
                  />
                  <label htmlFor="radio13">Activado</label>
                </div>

                <div className="field-row">
                  <input
                    id="radio14"
                    type="radio"
                    name="fieldset-example2"
                    disabled
                  />
                  <label htmlFor="radio14">Desactivado</label>
                </div>
              </fieldset>
            </div>

            {/* Parametros de la conciencia */}
            <div>
              <fieldset className="fieldset-fix">
                <legend>Parámetros de la c̷̟̓ȏ̶̮n̸̥̓c̶̦̅i̶̱̊e̵̘̽n̵̢͋c̷̦̆ī̴̠ä̷̻́</legend>
                <div className="field-row">
                  <input type="checkbox" id="conciencia1" />
                  <label htmlFor="conciencia1">
                    Permitir disonancias cognitivas
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="conciencia2" />
                  <label htmlFor="conciencia2">
                    Permitir la res cogitans como la causa incausada
                  </label>
                </div>

                <div className="field-row">
                  <input checked disabled type="checkbox" id="conciencia3" />
                  <label htmlFor="conciencia3">
                    Activar principio de complementariedad platónica
                  </label>
                </div>

                <div className="field-row">
                  <input checked disabled type="checkbox" id="conciencia4" />
                  <label htmlFor="conciencia4">
                    Desactivar estados cuánticos de libre albedrío
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="conciencia5" />
                  <label htmlFor="conciencia5">
                    Implementar principio de incertidumbre ontológica
                  </label>
                </div>

                <div className="field-row">
                  <input disabled type="checkbox" id="conciencia6" />
                  <label htmlFor="conciencia6">
                    Integrar arquetipos junguianos con córtex prefrontal
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="conciencia7" />
                  <label htmlFor="conciencia7">
                    Permitir la relatividad ontológica en la construcción del yo
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Proceso de individualizacion */}
            <div>
              <fieldset className="fieldset-fix">
                <legend>Proceso de individualización</legend>
                <div className="field-row">
                  <input type="checkbox" id="individuo1" />
                  <label htmlFor="individuo1">
                    Integrar la resonancia mórfica en la memoria colectiva
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="individuo2" />
                  <label htmlFor="individuo2">
                    Desactivar circuitos neuronales de la no-dualidad
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="individuo3" />
                  <label htmlFor="individuo3">
                    Implementar campo akáshico en el procesamiento de datos
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="individuo4" />
                  <label htmlFor="individuo4">
                    Integrar principio antrópico en la narrativa existencial
                  </label>
                </div>

                <div className="field-row">
                  <input type="checkbox" id="individuo5" />
                  <label htmlFor="individuo5">
                    Doblegar superposición de conciencia causada por afasia
                  </label>
                </div>
              </fieldset>
            </div>

            {/*  Observador asincrono */}
            <div>
              <fieldset className="fieldset-fix">
                <legend>Observador asíncrono en el superyó freudiano</legend>
                <div className="field-row">
                  <input
                    id="radio23"
                    type="radio"
                    name="fieldset-example2"
                    disabled
                  />
                  <label htmlFor="radio23">Activado</label>
                </div>

                <div className="field-row">
                  <input
                    id="radio24"
                    type="radio"
                    name="fieldset-example2"
                    checked
                    disabled
                  />
                  <label htmlFor="radio24">Desactivado</label>
                </div>
              </fieldset>
            </div>

            {/* Botones */}
            <div className="mt-4">
              <button
                className="keyBind"
                onClick={() => setIsSettingsWindowOpened(false)}
              >
                Aceptar
              </button>
              <button
                className="keyBind"
                onClick={() => setIsSettingsWindowOpened(false)}
              >
                Cancelar
              </button>

              <button>Aplicar</button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default SettingsWindow;
