import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class PinkSketch extends React.Component {
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
    var main;
    function burst() {
      var mouse = new Posn(p.mouseX, p.mouseY);
      main.forEach((elem) => {
        elem.applyForce(
          elem.pos
            .offset(mouse)
            .mul(Math.pow(2, -(elem.pos.dist(mouse) * 0.04))),
        );
      });
    }

    function makeGrid(width, height, blockSize) {
      var arr = [];

      for (var i = blockSize; i < width; i += blockSize) {
        for (var j = blockSize; j < height; j += blockSize) {
          var columnLabel = String.fromCharCode(65 + i / blockSize); // Letters A, B, C, ...
          var rowLabel = Math.floor(j / blockSize) + 1; // Numbers 1, 2, 3, ...
          var label = columnLabel + rowLabel;
          arr.push(new Point(i, j, label));
        }
      }

      return arr;
    }

    function Point(x, y, label, mass) {
      this.supposed = new Posn(x, y);
      this.pos = new Posn(x, y);
      this.vel = new Posn(0, 0);
      this.acc = new Posn(0, 0);
      this.label = label;
      this.mass = mass == null ? 1 : mass;

      this.draw = (size) => {
        p.text(this.label, this.pos.x, this.pos.y);
      };

      this.update = () => {
        this.applyForce(
          new Posn(Math.random(-0.01, 0.01), Math.random(-0.01, 0.01)),
        );
        this.seek(this.supposed);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mul(0.95); // friction
        this.acc.mul(0); //clear acc
      };

      this.seek = (target) => {
        this.applyForce(
          this.pos.offset(target).mul(this.pos.dist(target)).mul(-0.0001),
        );
      };

      this.applyForce = (force) => {
        this.acc.add(force);
      };

      this.click = (mousePos) => {
        // click (posn) -> void
      };
    }

    function Posn(x, y) {
      this.x = x;
      this.y = y;

      this.get = () => {
        return new Posn(this.x, this.y);
      };

      this.apply = (f) => {
        this.x = f(this.x);
        this.y = f(this.y);

        return new Posn(this.x, this.y);
      };

      this.add = (other) => {
        this.x += other.x;
        this.y += other.y;

        return this.get();
      };

      this.mul = (c) => {
        this.x *= c;
        this.y *= c;

        return this.get();
      };

      this.offset = (other) => {
        return new Posn(this.x - other.x, this.y - other.y);
      };

      this.dist = (other) => {
        return Math.sqrt(p.sq(other.x - this.x) + p.sq(other.y - this.y));
      };
    }

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(600, 600);
      p.flex({
        container: { parent: PinkWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);

      p.background(0);

      main = makeGrid(600, 600, 30);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background(0);

      p.fill("white");
      p.ellipse(p.mouseX, p.mouseY, 20, 20);
      p.textSize(28);

      main.forEach((elem) => {
        elem.update();
        elem.draw(100);
      });
    };

    p.mouseDragged = () => {
      burst();
    };

    p.mousePressed = () => {
      burst();
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

export default PinkSketch;
