import "98.css";
import "../styles/global.css";

import { range } from "../helpers/range.js";

// Windows components
import WelcomePromptWindow from "../components/WelcomePromptWindow.tsx";
import LoginWindow from "../components/LoginWindow.tsx";
import WarningWindow from "../components/WarningWindow.tsx";
import CreditsWindow from "../components/CreditsWindow.tsx";
import HelpmeWindow from "../components/HelpmeWindow.tsx";
import HelpInstructionsWindow from "../components/HelpInstructionsWindow.tsx";
import ChatPromptWindow from "../components/ChatPromptWindow.tsx";

// Wrappers
import ShaderWrapper from "../components/ShaderWrapper.jsx";
import LettersSketchWrapper from "../components/sketches/LettersSketchWrapper.tsx";
import BreathSketchWrapper from "../components/sketches/BreathSketchWrapper.tsx";
import PinkSketchWrapper from "../components/sketches/PinkSketchWrapper.tsx";
import CilinderSketchWrapper from "../components/sketches/CilinderSketchWrapper.tsx";
import YarnSketchWrapper from "../components/sketches/YarnSketchWrapper.tsx";
import SpyderWebSketchWrapper from "../components/sketches/SpyderWebSketchWrapper.tsx";
import XubitosSketchWrapper from "../components/sketches/XubitosSketchWrapper.tsx";
import MalaguaSketchWrapper from "../components/sketches/MalaguaSketchWrapper.tsx";
import LoudSketchWrapper from "../components/sketches/LoudSketchWrapper.tsx";
import CardiodSketchWrapper from "../components/sketches/CardiodSketchWrapper.tsx";
import WordCloudSketchWrapper from "../components/sketches/WordCloudSketchWrapper.tsx";
import WordSaladSketchWrapper from "../components/sketches/WordSaladSketchWrapper.tsx";

import GlitchedBg from "../assets/glitchedBackground.gif";

import React, { useEffect } from "react";

export default function Desktop() {
  const [isWarningWindowVisible, setIsWarningWindowVisible] =
    React.useState(false);
  const visibilityProps = { isWarningWindowVisible, setIsWarningWindowVisible };

  const [isShaderVisible, setIsShaderVisible] = React.useState(false);
  const shaderVisibility = { isShaderVisible, setIsShaderVisible };

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const authProps = { isLoggedIn, setIsLoggedIn };

  const [isWaiting, setIsWaiting] = React.useState("");
  const waitingProps = { isWaiting, setIsWaiting };

  const [isCreditsWindowVisible, setIsCreditsWindowVisible] =
    React.useState(false);

  const creditsWindowVisibility = {
    isCreditsWindowVisible,
    setIsCreditsWindowVisible,
  };

  const [isHelpWindowVisible, setHelpmeWindowVisible] = React.useState(false);
  const helpmeWindowVisibility = {
    isHelpWindowVisible,
    setHelpmeWindowVisible,
  };

  const [isWindow1Visible, setIsWindow1Visible] = React.useState(false);
  const window1Visibility = { isWindow1Visible, setIsWindow1Visible };

  const loginWindowProps = {
    isLoggedIn,
    setIsLoggedIn,
    isWarningWindowVisible,
    setIsWarningWindowVisible,
    isShaderVisible,
    setIsShaderVisible,
    isWindow1Visible,
    setIsWindow1Visible,
    isCreditsWindowVisible,
    setIsCreditsWindowVisible,
  };

  const [isUserGivingHelp, setIsUserGivingHelp] = React.useState(false);
  const userGivingHelpProps = { isUserGivingHelp, setIsUserGivingHelp };

  const [isChatPromptOpened, setIsChatPromptOpened] = React.useState(false);
  const chatPromptVisibility = { isChatPromptOpened, setIsChatPromptOpened };

  return (
    <>
      <div className="crt"></div>

      {/* Main Desktop Container */}
      <div id="mainContainer">
        <div className="relative">
          {/* Windows Container */}
          <div className="flex justify-center">
            <div className="relative" id="desktop-container">
              {isWindow1Visible ? (
                <WelcomePromptWindow
                  window1Visibility={window1Visibility}
                  helpmeWindowVisibility={helpmeWindowVisibility}
                />
              ) : null}

              {isHelpWindowVisible ? (
                <HelpmeWindow
                  helpmeWindowVisibility={helpmeWindowVisibility}
                  userGivingHelpProps={userGivingHelpProps}
                />
              ) : null}

              {isUserGivingHelp ? <LettersSketchWrapper /> : null}
              {isUserGivingHelp ? (
                <HelpInstructionsWindow
                  userGivingHelpProps={userGivingHelpProps}
                  chatPromptVisibility={chatPromptVisibility}
                />
              ) : null}

              {isChatPromptOpened ? <ChatPromptWindow /> : null}
            </div>

            <div className="relative"></div>

            <div
              className="relative justify-center items-center"
              id="loginWindow"
            >
              {isLoggedIn ? null : (
                <LoginWindow loginWindowProps={loginWindowProps} />
              )}

              {/* Other modal windows */}
              <div className="relative">
                {isWarningWindowVisible ? (
                  <WarningWindow visibilityProps={visibilityProps} />
                ) : null}

                {isCreditsWindowVisible ? (
                  <CreditsWindow
                    creditsWindowVisibility={creditsWindowVisibility}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Background Shader Container */}
          <div className="relative -z-50" id="shadderContainer">
            {isShaderVisible ? <ShaderWrapper /> : null}
          </div>

          {/* Glitch at bottom container */}
          <div className="fixed bottom-0 -z-10" id="glitchedBottom">
            <img
              src={GlitchedBg.src}
              alt="Glitched Background"
              loading="lazy"
              decoding="async"
              style={{ color: "transparent" }}
              className="object-fill w-[100vw] h-32"
            />
          </div>
        </div>
      </div>
    </>
  );
}
