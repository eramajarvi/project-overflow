import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class CardiodSketch extends React.Component {
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
    let startTime = 0.0;
    let drawTime = 0.0;
    let pg;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(200, 200);

      p.flex({
        container: { parent: CardiodWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);

      p.background(0);
      p.reset();
    };

    p.reset = () => {
      startTime = p.millis();
      drawTime = 0.0;
      pg = p.createGraphics(200, 200);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      let r0 = 35;
      let r1 = 35;

      let t = (p.millis() - startTime) * 0.001;
      let dt = t - drawTime;

      p.background(0);

      //This is the inner ball
      let center = p.createVector(0.5 * p.width, 0.5 * p.height);

      p.fill(0);
      p.ellipse(center.x, center.y, 2 * r0, 2 * r0);

      let orbit = p.createVector(p.cos(2.0 * t), p.sin(2.0 * t)).mult(r0);
      let origin = p5.Vector.add(
        center,
        p.createVector(p.cos(3.0 * t), p.sin(3.0 * t)).mult(r0),
      );

      let p1 = p5.Vector.add(center, orbit);

      let r = p5.Vector.sub(p1, origin).mag();

      p.noFill();
      p.ellipse(p1.x, p1.y, 2 * r, 2 * r);

      p.line(origin.x, origin.y, p1.x, p1.y);
      p.ellipse(p1.x, p1.y, 1, 1);
      p.ellipse(origin.x, origin.y, 1, 1);

      if (dt > p.TWO_PI / 200) {
        pg.noFill();
        pg.strokeWeight(0.2);
        pg.stroke(255, 255);
        pg.ellipse(p1.x, p1.y, 2 * r, 2 * r);
        drawTime = t;
      }

      p.image(pg, 0, 0, p.width, p.height);
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

export default CardiodSketch;
