let frag;
let vert;

async function shaderImporter() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shaderNum = getRandomInt(1, 4);

  const fragModule = await import(`../helpers/shader-0${shaderNum}/frag.js`);
  const vertModule = await import(`../helpers/shader-0${shaderNum}/vert.js`);

  frag = fragModule.default || fragModule;
  vert = vertModule.default || vertModule;
}

export { frag, vert, shaderImporter };
