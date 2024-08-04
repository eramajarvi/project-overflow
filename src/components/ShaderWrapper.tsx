import React from "react";
import Shader from "./Shader.jsx";

function ShaderWrapper({ shaderVisibility }) {
  const { isShaderVisible, setIsShaderVisible } = shaderVisibility;

  return isShaderVisible ? (
    <div>
      {/* This wrapper is needed to contain the shader in a component */}
      <Shader />
    </div>
  ) : null;
}

export default ShaderWrapper;
