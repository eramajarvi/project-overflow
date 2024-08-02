import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class CilinderSketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    let t;
    let ender;
    let sze = 1;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(600, 600, p.WEBGL);

      p.flex({
        container: { parent: CilinderWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);

      p.colorMode(p.HSB, 255);
      p.background(255);
      p.strokeWeight(0.5);
      t = 0;
      ender = 1;
      p.orbitControl(); // Habilita el control de órbita del mouse
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background("black");
      p.strokeWeight(1.5);
      if (p.frameCount % 60 == 0) {
        t++;
        ender++;
      }

      if (t > ender) {
        t = 0;
        ender = 1;
      }

      for (let t = 7; t < 8; t++) {
        p.stroke((0 * 29 + t * 24) % 255, 0, 240);
        p.fill(t * 24, 240, 240, 10);
        p.push(); // Guarda la configuración de la transformación actual
        p.rotateX(p.frameCount * 0.01); // Rotación adicional solo para demostración
        p.rotateY(p.frameCount * 0.01); // Rotación adicional solo para demostración
        p.cylinder(sze * 250 + t * 10, sze * 200 + t * 10, 24, 16);
        p.pop(); // Restaura la configuración de la transformación anterior
      }
    };
  };

  componentDidMount() {
    //We create a new p5 object on component mount, feed it
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      //This div will contain our p5 sketch
      <div ref={this.myRef}></div>
    );
  }
}

export default CilinderSketch;
