import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class LoudSketch extends React.Component {
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

    //made by twitter.com/mattywillo_
    //for twitter.com/clarabellum's #codesketchtober prompt: loud
    let { PI, sin, cos, min, max } = Math;

    let t = 0;
    let step = 0.00015;

    let ss = (t) => t * t * (3 - 2 * t);
    let clamp = (t, a, b) => min(max((t - a) / (b - a), a), b);
    let nsin = (x) => sin(x) * 0.5 + 0.5;

    let lf = (r, l, d1, d2, mag) => {
      return [...Array(r)]
        .map((_, i) => [
          0.7 * cos(2 * PI * (i / r)),
          0.7 * sin(2 * PI * (i / r)),
        ])
        .map((d, i) =>
          d.map((q) => {
            let s = i / r;
            let w = sin(s * PI * 100 * d2) * mag;
            let m = min(max(s, l) - min(s, l), 1 - max(s, l) + min(s, l));
            m = m < d1 ? ss(1 - m / d1) : 0;
            return q * (1 + w * m);
          }),
        );
    };

    let cnf = [
      [
        { col: [1, 0, 0], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0, a: 3, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0, a: 3, b: 1, c: 5, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0, a: 3, b: 0.2, c: 4, d: 0.2, e: 1 },
      ],
      [
        { col: [1, 0, 0], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0, a: 3, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0.5, a: 3, b: 1, c: 5, d: 0.2, e: 1 },
        { col: [1, 0, 0], t: 0, a: 3, b: 0.3, c: 4, d: 0.2, e: 1 },
      ],
      [
        { col: [0, 1, 0], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0, a: 4, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0, a: 4, b: 0.4, c: 5, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0, a: 4, b: 0.2, c: 4, d: 0.2, e: 1 },
      ],
      [
        { col: [0, 1, 0], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0, a: 4, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0.5, a: 4, b: 0.4, c: 5, d: 0.2, e: 1 },
        { col: [0, 1, 0], t: 0, a: 4, b: 0.3, c: 4, d: 0.2, e: 1 },
      ],
      [
        { col: [0, 0, 1], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0, a: 5, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0, a: 5, b: 0.56, c: 5, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0, a: 5, b: 0.2, c: 4, d: 0.2, e: 1 },
      ],
      [
        { col: [0, 0, 1], t: 0, a: 2, b: 0.3, c: 4, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0, a: 5, b: 0.5, c: 4, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0.5, a: 5, b: 0.56, c: 5, d: 0.2, e: 1 },
        { col: [0, 0, 1], t: 0, a: 5, b: 0.3, c: 4, d: 0.2, e: 1 },
      ],
    ];

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      let res = 200;

      p.colorMode(p.RGB, 1, 1, 1, 1);
      p.createCanvas(res, res);

      p.flex({
        container: { parent: LoudWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      t += step * p.deltaTime;
      p.blendMode(p.BLEND);
      if (p.frameCount == 1) p.background(0.2);

      p.background(0.2, 0.3);
      let res = 200;

      p.scale(res / 2, res / 2);
      p.translate(1, 1);
      p.blendMode(p.ADD);
      p.strokeWeight(0.01);
      cnf.forEach((ca) => {
        let c = ca[(t | 0) % cnf[0].length];
        p.stroke(...c.col);
        lf(
          1500,
          (t + c.t) % 1,
          nsin((t % 1) * PI * c.a) * c.b,
          c.e,
          sin((t % 1) * PI * c.c) * c.d,
        ).forEach((d, i, a) => p.line(...d, ...a[(i + 1) % a.length]));
      });
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

export default LoudSketch;
