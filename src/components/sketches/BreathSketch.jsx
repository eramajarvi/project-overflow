import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

// This sketch creates a grid of text repeating the word "BREATHE".
// Each letter is represented as a "particle" object. The text shrinks and moves towards the mouse when the mouse is near.
class BreathSketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    const particles = [];
    const txt = "AYUDAME";
    const clr = "white";

    let txtindex = 0;
    let font;

    // Control the resolution and text scale
    let res;
    let scale;

    // Control margin and spacing between letters
    let margin;
    let xSpacing;
    let ySpacing;
    let maxDist;

    // Control speed of text movement
    const speed = 0.015;

    function reset() {
      scale = res / 400;
      margin = 10 * scale;
      xSpacing = 10 * scale;
      ySpacing = 13 * scale;
      maxDist = 200 * scale;
    }

    p.preload = () => {
      font = p.loadFont("/fonts/mssansserif/W95FA.otf");
    };

    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      res = Math.min(p.windowWidth, p.windowHeight);
      reset();
      p.createCanvas(600, 600);

      p.flex({
        container: { parent: BreathWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(3);

      p.angleMode(p.DEGREES);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont(font);

      // Iterate over grid positions, minus some margins
      for (let y = margin; y <= p.height - margin; y += ySpacing) {
        for (let x = margin; x <= p.width - margin; x += xSpacing) {
          particles.push({
            x,
            y,
            clr,
            origX: x,
            origY: y,
            targetX: x,
            targetY: y,
            txt: txt[txtindex],
          });

          txtindex = (txtindex + 1) % txt.length;
        }
      }

      p.describe(
        "A meditative grid of text that repeats 'breathe'. The grid warps to provide more spacing for letters centered around the mouse position.",
      );
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background(0);

      // For each letter...
      for (let particle of particles) {
        // Calculate target XY based on distance from mouse
        const d = p.dist(particle.origX, particle.origY, p.mouseX, p.mouseY);

        const distortionX = p.map(
          d,
          0,
          maxDist,
          p.mouseX,
          particle.origX,
          true,
        );
        const distortionY = p.map(
          d,
          0,
          maxDist,
          p.mouseY,
          particle.origY,
          true,
        );

        particle.targetX = distortionX;
        particle.targetY = distortionY;

        // Move towards the target XY based on the speed variable
        const dx = (particle.targetX - particle.x) * speed;
        const dy = (particle.targetY - particle.y) * speed;
        particle.x = particle.x + dx;
        particle.y = particle.y + dy;

        // Set the text size based on distance from mouse
        p.textSize(p.map(d, 0, maxDist, 2 * scale, 16 * scale, true));

        // Draw letter :)
        p.fill(particle.clr);
        p.text(particle.txt, particle.x, particle.y);
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

export default BreathSketch;
