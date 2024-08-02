import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

mountFlex(p5);

class SpyderWebSketch extends React.Component {
  constructor(props) {
    super(props);
    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    this.myRef = React.createRef();
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
    // this class describes the properties of a single particle.
    class Particle {
      // setting the co-ordinates, radius and the
      // speed of a particle in both the co-ordinates axes.
      constructor() {
        this.x = p.random(0, 300);
        this.y = p.random(0, 300);
        this.r = p.random(10, 20);
        this.xSpeed = p.random(-2, 2);
        this.ySpeed = p.random(-1, 1.5);
      }

      // creation of a particle.
      createParticle() {
        p.noStroke();
        p.fill("white");
        p.circle(this.x, this.y, this.r);
      }

      // setting the particle in motion.
      moveParticle() {
        if (this.x < 0 || this.x > p.width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > p.height) this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
      }

      // this function creates the connections(lines)
      // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach((element) => {
          let dis = p.dist(this.x, this.y, element.x, element.y);
          if (p.random(dis) < 20) {
            p.strokeWeight(1);
            p.stroke("white");
            p.line(this.x, this.y, element.x, element.y);
          }
        });
      }
    }

    // an array to add multiple particles
    let particles = [];

    // Native p5 functions work as they would normally but prefixed with
    // a p5 object "p"
    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(300, 300);

      for (let i = 0; i < 500 / 15; i++) {
        particles.push(new Particle());
      }

      p.flex({
        container: { parent: SpyderWebWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(1);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      p.background("black");

      for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
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

export default SpyderWebSketch;
