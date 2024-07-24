import React from "react";
import p5 from "p5";
import { Glitch } from "../helpers/p5.glitch";

class GlitchBg extends React.Component {
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
    let glitch;

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(p.windowWidth, 100);

      glitch = new Glitch();

      glitch.loadType("jpg");
      glitch.loadImage("../assets/transparent.png");
      p.imageMode(p.CORNERS);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      glitch.resetBytes(); // reset bytes to original each draw cycle

      // see w/ 10 random bytes
      glitch.randomBytes(10);

      glitch.buildImage(function (img) {
        p.background(0); // background on demand of first image ready
        p.image(img, 0, 0, p.windowWidth, glitch.height);
      });
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, glitch.height);
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

export default GlitchBg;
