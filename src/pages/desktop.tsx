import "98.css";
import "../styles/global.css";

import WelcomePromptWindow from "../components/WelcomePromptWindow.tsx";
import LoginWindow from "../components/LoginWindow.tsx";
import WarningWindow from "../components/WarningWindow.tsx";
import ShaderWrapper from "../components/ShaderWrapper.jsx";

import GlitchedBg from "../assets/glitchedBackground.gif"

import React from "react";

export default function Desktop() {
  const [isVisible, setIsVisible] = React.useState(false);
  const visibilityProps = {isVisible, setIsVisible}

  const [isShaderVisible, setIsShaderVisible] = React.useState(false);
  const shaderVisibility = {isShaderVisible, setIsShaderVisible}

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const authProps = { isLoggedIn, setIsLoggedIn };

  const [isWaiting, setIsWaiting] = React.useState("");
  const waitingProps = {isWaiting, setIsWaiting}

  const [isWindow1Visible, setIsWindow1Visible] = React.useState(false)
  const window1Visibility = {isWindow1Visible, setIsWindow1Visible}

  const loginWindowProps = { isLoggedIn, setIsLoggedIn, isVisible, setIsVisible, isShaderVisible, setIsShaderVisible, isWindow1Visible, setIsWindow1Visible }

  return (
    <div className="bgGradient" id="mainContainer">
      <div className="relative">

        {/* Windows Container */}
        <div className="flex justify-center">
          <div className="relative" id="welcomePromptWindow">
            {isWindow1Visible ? <WelcomePromptWindow window1Visibility={window1Visibility} /> : null}
          </div>

          <div
            className="relative justify-center items-center"
            id="loginWindow"
          >
            {isLoggedIn ? null : <LoginWindow loginWindowProps={loginWindowProps}/>}

            {/* Other modal windows */}
            <div className="relative">
              {isVisible ? <WarningWindow visibilityProps={visibilityProps}/> : null}
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
  );
}
