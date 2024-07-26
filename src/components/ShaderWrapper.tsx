import React from "react";

import { useStore } from "@nanostores/react";
import { isLoggedin } from "../store.js";

import Shader from "./Shader.jsx";

function ShaderWrapper() {

  return(
    <div>
      {/* This wrapper is needed to contain the shader in a component */}
      <Shader />
    </div>
  );
} 

export default ShaderWrapper;
