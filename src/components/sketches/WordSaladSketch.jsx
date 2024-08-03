import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

import { BAD_PHRASES } from "../../helpers/badPhrases.js";

class WordSaladSketch extends React.Component {
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
    const words = BAD_PHRASES;

    let fontSize = 16;
    const longest = words.reduce((a, b) => (a.length > b.length ? a : b));
    let hu = 0;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(800, 800);

      p.flex({
        container: { parent: WordSaladWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);

      p.colorMode(p.HSB, 255);
      p.background("black");
      p.textFont("helvetica");
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background("black");
      p.textSize(fontSize);

      p.fill(hu % 255, 255, 200);

      const longWord = p.textWidth(longest) + 4;

      for (let x = 0; x < p.width; x += longWord) {
        for (let y = 0; y < p.height; y++) {
          p.text(
            words[p.int(p.random(0, words.length))],
            x,
            fontSize * (y + 1),
          );
        }
      }

      if (p.frameCount % 6 == 0) {
        //fontSize += 2;
        hu += 10;
      }

      if (fontSize > 210) fontSize = 166;
      p.frameRate(2);
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

export default WordSaladSketch;
