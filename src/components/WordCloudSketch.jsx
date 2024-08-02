import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

/**************************************************
 * The Poetry Clouds by Kyle Geske (stungeye.com) *
 **************************************************/

class WordCloudSketch extends React.Component {
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
    // Defines the size of the text grid in pixels.
    const cloudPixelScale = 5;

    // Cloud coverage between 0.3 (plentiful) and 0.6 (sparse).
    const cloudCutOff = 0.4;

    // Speed of cloud panning. Larger values make it faster.
    const panSpeed = 18;

    // Speed of cloud transformation over time. Larger is faster.
    const cloudEvolutionSpeed = 14;

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(200, 200);

      p.flex({
        container: { parent: WordCloudWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1.5);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      // A beautiful sky blue background.
      p.background("black");

      // Nested loop to draw a grid of letters across the canvas.
      for (let x = 0; x <= p.width; x += cloudPixelScale) {
        for (let y = 0; y <= p.height; y += cloudPixelScale) {
          let tinyTimeOffset = p.millis() / 100000;
          // Defines the scale of noise for visually appealing clouds.
          let noiseScale = 0.01;

          // 3D noise sampling: The first two dimensions are tied to
          // the canvas position, with the x and y values panning
          // slowly over time. The third dimension is solely influenced
          // by time, enabling the clouds to gradually change shape.
          let n = p.noise(
            x * noiseScale + tinyTimeOffset * panSpeed,
            y * noiseScale + tinyTimeOffset * 0.25 * panSpeed,
            tinyTimeOffset * cloudEvolutionSpeed,
          );

          // Skip this position/letter if noise value is under cutoff.
          if (n < cloudCutOff) {
            continue;
          }

          // Use the alpha channel to fade out the edges of the clouds.
          let alpha = p.map(n, cloudCutOff, 0.65, 10, 255);
          p.fill(255, alpha);

          // Set the text size to be 15% larger than the grid.
          p.textSize(cloudPixelScale * 1.15);
          p.text(getLetterForCoordinate(x, y), x, y);
        }
      }
    };

    function getLetterForCoordinate(x, y) {
      // Simple hash function for x, y coordinates.
      let hash = (x + y) * p.sin(x * y);
      // Ensure a positive value and limit to 26 letters.
      let index = p.abs(p.int(hash * 1000)) % 26;
      // Convert to uppercase letter using ASCII character code.
      return String.fromCharCode(65 + index);
    }
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

export default WordCloudSketch;
