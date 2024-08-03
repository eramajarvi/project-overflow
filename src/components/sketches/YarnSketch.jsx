import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class Sketch extends React.Component {
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
    let rotationAngle = 45;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(300, 300, p.WEBGL);
      p.flex({
        container: { parent: YarnWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background("black");
      // Spin the scene
      rotationAngle += 0.01;
      p.rotateX(rotationAngle);
      p.rotateY(rotationAngle * 0.78);

      let back = p.createGraphics(p.width, p.height);
      back.background(255);
      back.stroke(0);
      back.noFill();
      let thickness = 6;
      back.strokeWeight(thickness);
      for (let y = -25; y < p.height + 25; y += thickness * 2) {
        back.beginShape();
        for (let x = -15; x < p.width + 15; x += 1) {
          back.curveVertex(
            x,
            y + Math.sin(((x * p.TWO_PI) / p.width) * 2) * 18,
          );
        }
        back.endShape();
      }
      let margin = 15;
      back.fill(0);
      back.noStroke();
      back.rect(0, 0, p.width, margin);
      back.rect(0, 0, margin, p.height);
      back.rect(0, p.height - margin, p.width, margin);
      back.rect(p.width - margin, 0, margin, p.height);
      p.texture(back);
      p.sphere(150);

      p.noStroke();
      p.ambientLight(100);
      p.directionalLight(255, 232, 25, 5, 5, -15);
      p.directionalLight(63.75, 58, 6.25, -10);
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

export default Sketch;
