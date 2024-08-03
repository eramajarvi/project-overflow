let frag;
let vert;

async function shaderImporter() {
  // Select randomly one of the available shaders
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shaderNum = getRandomInt(1, 8);

  const fragModule = await import(`../helpers/shader-0${shaderNum}/frag.js`);
  const vertModule = await import(`../helpers/shader-0${shaderNum}/vert.js`);

  frag = fragModule.default || fragModule;
  vert = vertModule.default || vertModule;
}

export { frag, vert, shaderImporter };
