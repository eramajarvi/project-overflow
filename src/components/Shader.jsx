import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

// Llamar al importador de shaders dinamicamente
import { frag, vert, shaderImporter } from "../helpers/shaderImporter";

async function useShaders() {
  await shaderImporter();
}

await useShaders();

// Construyte el sketch de p5
let theShader;

mountFlex(p5);

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing

  Sketch = (p) => {
    p.preload = () => {
      theShader = new p5.Shader(this.renderer, vert, frag);
    };

    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    p.setup = () => {
      //Everyhting that normally happens in setup works

      // shaders require WEBGL mode to work
      //p.createCanvas(mySize, (mySize / 16) * 9, p.WEBGL);

      p.createCanvas(p.windowWidth / 10, p.windowHeight / 10, p.WEBGL);

      p.flex({
        container: { parent: p.shadderContainer },
        canvas: { fit: p.FILL, id: "bgShadder" },
        stylePage: true,
      });

      p.pixelDensity(4);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      // shader() sets the active shader with our shader
      p.shader(theShader);

      theShader.setUniform("u_resolution", [p.width, p.height]);
      theShader.setUniform("u_time", p.millis() / 1000.0);
      theShader.setUniform("u_frame", p.frameCount / 1.0);
      theShader.setUniform("u_mouse", [
        p.mouseX / 100.0,
        p.map(p.mouseY, 0, p.height, p.height, 0) / 100.0,
      ]);

      // rect gives us some geometry on the screen
      p.rect(0, 0, p.width, p.height);

      p.scale(2);
    };
  };

  componentDidMount() {
    //We create a new p5 object on component mount, feed it

    this.myP5 = new p5(this.Sketch, this.myRef.current);
    // this.myP5 = new p5(mountFlex(p5), this.myRef.current);
  }

  render() {
    return (
      //This div will contain our p5 sketch
      <div ref={this.myRef}></div>
    );
  }
}

export default Sketch;
