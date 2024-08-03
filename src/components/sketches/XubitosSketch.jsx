import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class XubitosSketch extends React.Component {
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

    // Cube to sphere program. Inspired by Golan Levin’s circle morphing:
    // https://github.com/golanlevin/circle-morphing, brought to us by
    // Dan Shiffman’s The Coding Train.

    const options = {
      cubeEdgeLength: 20,
      betweenCubeSpace: 55,
      morphPeriodSecs: 10,
      yRotationPeriodSecs: 6,
    };

    let numCubes;
    let startCoord;
    let halfSpace;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(400, 400, p.WEBGL);

      p.flex({
        container: { parent: XubitosWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);

      const maxLargeCubeEdge = p.min(800, p.width, p.height);
      numCubes = Math.floor(
        maxLargeCubeEdge / (options.cubeEdgeLength + options.betweenCubeSpace),
      );

      const spaceNeeded =
        numCubes * options.cubeEdgeLength +
        (numCubes - 1) * options.betweenCubeSpace;
      halfSpace = spaceNeeded / 2;
      startCoord = -halfSpace + options.cubeEdgeLength / 2;
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      function colorPart(offset) {
        return p.map(offset, -halfSpace, halfSpace, 0, 255);
      }

      function forRange(fn) {
        for (let i = 0; i < numCubes; ++i) {
          fn(
            startCoord +
              i * (options.cubeEdgeLength + options.betweenCubeSpace),
          );
        }
      }

      p.background("black");
      p.translate(0, 0, -700);
      p.rotateX(p.PI / 4);
      p.rotateY((p.millis() / 1000 / options.yRotationPeriodSecs) * p.TWO_PI);
      const cornerVector = p.createVector(halfSpace, halfSpace, halfSpace);
      const cosSquashAt = 0.7;
      const radians = (p.millis() / 1000 / options.morphPeriodSecs) * p.TWO_PI;
      const cosOverTime = p.constrain(
        p.cos(radians),
        -cosSquashAt,
        cosSquashAt,
      );
      const changingMaxRadius = p.createVector(
        p.map(
          cosOverTime,
          -cosSquashAt,
          cosSquashAt,
          halfSpace,
          cornerVector.mag(),
        ),
        0,
        0,
      );

      forRange((x) =>
        forRange((y) =>
          forRange((z) => {
            let pos = p.createVector(x, y, z);
            const shrinkNeeded = changingMaxRadius.mag() / pos.mag();
            if (shrinkNeeded < 1) {
              pos = pos.mult(shrinkNeeded);
            }
            p.push();
            p.translate(pos.x, pos.y, pos.z);
            p.fill(colorPart(x), colorPart(y), colorPart(z));
            p.box(options.cubeEdgeLength);
            p.pop();
          }),
        ),
      );
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

export default XubitosSketch;
