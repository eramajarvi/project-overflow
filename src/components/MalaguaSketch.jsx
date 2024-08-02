import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

mountFlex(p5);

class MalaguaSketch extends React.Component {
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
    let r = 200;
    let o = 0;

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(300, 400);

      p.flex({
        container: { parent: MalaguaWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(2);

      p.background(255);
      p.noFill();
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background("black");
      //clear();
      let t = o;

      p.push();

      p.translate(p.width / 2, p.height / 2);
      p.beginShape();

      for (let i = 0; i < p.TAU; i += 0.1) {
        let n = p.map(p.noise(t, i / 5), 0, 1, -r / 2, r * 2);
        t += 0.05;
        let y = p.cos(i) * r;
        let x = p.sin(i) * n;
        p.vertex(x, y);
        p.stroke(p.random(10), p.random(155), p.random(25));
        p.strokeWeight(3);
        p.line(x, y, 0, 0);
      }

      p.endShape(p.CLOSE);
      o += 0.01;
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

export default MalaguaSketch;
