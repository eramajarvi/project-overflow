import React from "react";

import { useStore } from "@nanostores/react";
import { isLoggedin } from "../store.js";

import Shader from "./Shader.jsx";

export default function TestShadderWrapper() {
  const $isLoggedIn = useStore(isLoggedin);

  return $isLoggedIn ? (
    <div>
      <Shader />
    </div>
  ) : null;
}
