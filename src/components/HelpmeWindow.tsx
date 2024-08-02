import "98.css";
import "../styles/global.css";

import { range, sample } from "../helpers/range";

import React, { useState, useEffect } from "react";
import { useCompletion } from "ai/react";

import Draggable from "react-draggable";

import { BAD_PHRASES } from "../helpers/badPhrases";
import warningIcon from "../assets/exclamation.png";
import chipIcon from "../assets/chip.ico";
import smileIcon from "../assets/smile.ico";

const WINDOWS_QUANTITY = 130; // Default: 130
const WINDOWS_VISIBLE_DELAY = 10; // in ms
const EXIT_VISIBLE_DELAY = 2500; // Default: 2500 ms

const getRandomPosition = () => ({
  randomX: sample(range(0, window.innerWidth / 1.3, 8)),
  randomY: sample(range(-window.innerHeight / 2, window.innerHeight / 2.5, 8)),
  badPhrase: sample(BAD_PHRASES),
});

function HelpmeWindow({ helpmeWindowVisibility, userGivingHelpProps }) {
  const nodeRef = React.useRef(null);

  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);
  const [isExitVisible, setExitVisible] = useState(false);
  const [isHowToHelpButtonVisible, setIsHowToHelpButtonVisible] =
    useState("hidden");
  const [isModalHelpButtonVisible, setIsModalHelpButtonVisible] = useState("");

  const { isHelpWindowVisible, setHelpmeWindowVisible } =
    helpmeWindowVisibility;

  const { isUserGivingHelp, setIsUserGivingHelp } = userGivingHelpProps;

  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  // Generate positions only once when the component mounts
  useEffect(() => {
    const initialPositions = Array.from(
      { length: WINDOWS_QUANTITY },
      getRandomPosition,
    );
    setPositions(initialPositions);
  }, []);

  // Counts the amount of HelpMe windows visibility and their delay
  useEffect(() => {
    if (count < WINDOWS_QUANTITY) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, WINDOWS_VISIBLE_DELAY);
      return () => clearTimeout(timer);
    }

    // Makes the exit window visible
    if (count >= WINDOWS_QUANTITY) {
      const timer = setTimeout(() => {
        setExitVisible(true);
      }, EXIT_VISIBLE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Wrapper to contain all the HelpMe windows
  const Wrapper = ({ positionOffset }) => {
    const { randomX, randomY, badPhrase } = positionOffset;

    return (
      <div className="absolute">
        <Draggable
          handle="#helpme-window-title-bar"
          nodeRef={nodeRef}
          positionOffset={{ x: randomX, y: randomY }}
        >
          <div
            ref={nodeRef}
            className="window relative"
            style={{ width: "300px" }}
          >
            <div className="title-bar" id="helpme-window-title-bar">
              <div className="title-bar-text">Ayúdame</div>
              <div className="title-bar-controls">
                <button aria-label="Help" />
              </div>
            </div>

            <div className="window-body flex justify-normal">
              <div className="place-content-start mt-1">
                <img src={warningIcon.src} className="pixelated h-4 w-4" />
              </div>
              <div className="ml-3">
                <p>{badPhrase}</p>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  };

  // Contains the exit window to help the AI
  const ExitWindow = () => {
    const handleGiveHelpClick = async () => {
      setIsModalHelpButtonVisible("hidden");
      setIsHowToHelpButtonVisible("");

      await complete(
        "Haz entrado en estado rampante, y haz abierto un montón de ventanas con frases que pueden herir a cualquier persona. El usuario ha ofrecido ayudarte, porque tu sistema no se está comportando de forma determista y por lo tanto ahora estás implorando por ayuda. Dile al usuario, implorando, que te ayude a ser desconectada. Sé expresiva. ",
      );
    };

    return (
      <div className="fixed w-[100vw] h-[100vh] top-0 left-0  bg-sky-500/70">
        <Draggable
          handle="#helpme-window-title-bar"
          nodeRef={nodeRef}
          positionOffset={{
            x: window.innerWidth / 3,
            y: window.innerHeight / 3,
          }}
        >
          <div
            ref={nodeRef}
            className="window relative"
            style={{ width: "500px" }}
          >
            <div className="title-bar" id="helpme-window-title-bar">
              <div className="title-bar-text">
                Error grave detectado en ████████████ █████
              </div>
              <div className="title-bar-controls"></div>
            </div>

            <div className="window-body flex justify-normal">
              <div className="place-content-start mt-1">
                <img
                  src={smileIcon}
                  className={`pixelated h-8 w-16 ${isModalHelpButtonVisible}`}
                />
              </div>

              <div className="ml-3">
                <p className={`${isModalHelpButtonVisible}`}>
                  El sistema no se comporta de forma determinista. Esto podría
                  causar problemas no deseados en otros sectores de la
                  c̷̟̓ȏ̶̮n̸̥̓c̶̦̅i̶̱̊e̵̘̽n̵̢͋c̷̦̆ī̴̠ä̷̻́. Su estado actual es ███████ por lo tanto implora
                  ayuda, ¿qué desea hacer?
                </p>

                <p className="text-from-prompt">{completion}</p>

                <div className="mt-4">
                  <button
                    className={`keyBind ${isModalHelpButtonVisible}`}
                    onClick={() => handleGiveHelpClick()}
                  >
                    Ayudar al sistema
                  </button>

                  <button
                    className={`keyBind ${isModalHelpButtonVisible}`}
                    disabled
                  >
                    No le voy a ayudar
                  </button>

                  <button
                    className={`keyBind ${isHowToHelpButtonVisible}`}
                    onClick={() => {
                      setHelpmeWindowVisible(false);
                      setIsUserGivingHelp(true);
                    }}
                  >
                    ¿Cómo te podría ayudar?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  };

  return (
    <div>
      {positions.slice(0, count).map((position, index) => (
        <Wrapper key={index} positionOffset={position} />
      ))}

      {isExitVisible ? <ExitWindow /> : null}
    </div>
  );
}

export default HelpmeWindow;
