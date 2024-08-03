import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class MathTextbookSketch extends React.Component {
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
    //90s math textbook cover
    //twitter.com/mattywillo_
    //for the #WCCChallenge on birbs nest discord: https://discord.gg/S8c7qcjw2b
    //
    //classic inside out torus with a grid on it and some distortions
    let canvas, sh;
    let t = 0;
    let w;
    let h;

    //ratio'd
    const rat = 1;

    //seconds between cycling to a new configuration
    //the period of most of the animations is TAU so TAU is most uniform but anything works, lower than PI is pretty chaotic
    const cycle = Math.PI * 2;

    //linear interpolation
    const mix = (a, b, f) =>
      Array.isArray(a) ? a.map((x, i) => mix(x, b[i], f)) : a * (1 - f) + b * f;

    //smoothstep
    const ss = (t) => t * t * (3 - 2 * t);

    //config queue. there are 8 animation 'features' in the shader
    //a config is an array of 8 0/1s, turning each animation feature on or off
    //the queue is cycled through in order, when it runs out of configs, new random ones are generated
    let confQueue = [
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
    ];

    //generates a random configuration
    //take a random int in range 1..256, puts the bits into an array and then shuffles them a bit
    //on average this produces configs that favour earlier options over later (ie 1 is turned on more often than 7)
    //and favours turning on half-ish of the options
    //which i feel gives a nice balance
    const randConf = (_) =>
      [...Array(8)]
        .map((_, i) => (((Math.random() * 255) | (0 + 1)) >> i) & 1)
        .sort((_) => 0.5 - Math.random());

    //noprotect this line prevents openprocessing from injecting loop protection code into the glsl string
    let shSrc = [
      //vertex shader that makes a p5 rect take up the entire canvas and sets uvs
      `attribute vec3 aPosition;
varying vec2 uv;
void main() {
  gl_Position = vec4(aPosition*2.-1.,1.);
  uv = vec2(aPosition.x, 1.-aPosition.y);
}
`,
      `precision highp float;

#define PI ` +
        Math.PI +
        `
#define MAX_DEPTH 10.
#define MAX_STEPS 60
#define EPSILON 0.0001

varying vec2 uv;
uniform vec2 pd;
uniform float t,rat;

//the config uniforms. rather than using an array, just define conf1,conf2, etc, etc
uniform float ${[...Array(8)].map((x, i) => "conf" + i).join()};

mat2 rot(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

//sdf of an inverted torus, with some distortion
float map(vec3 p, float t) {
    return -(length(vec2(length(p.xz)-1., p.y))-mix(.5,mix(.75,.25,sin(t+PI*.25-p.y*PI-p.x*PI)*.5+.5), conf4));
}

//basic ray marching loop
float march(vec3 ro, vec3 rd, float t) {
    float a = 0.;
    for(int i = 0; i < MAX_STEPS; i++) {
        float h = map(ro+rd*a, t);
        a += h;
        if(a>MAX_DEPTH || abs(h) < EPSILON) break;
    }
    return a;
}

//takes a ray origin and direction, a time, and a refraction index, and marches/colours the scene
vec3 scene(vec3 ro, vec3 rd, float t, float ir) {
  vec3 col = vec3(0);
  int b = 0;

  //mess with the ray direction using the refraction index provided
  rd = refract(rd*vec3(1,1,rd*rd*rd), normalize(vec3(0,0,mix(-1.,smoothstep(1.,-1.,sin(t)),conf3))-rd*.5), ir);

  //march the scene
  float h = march(ro, rd, t);
  vec3 hit = ro+rd*h;
	//commented this out because it sometimes causes broken output depending on the random confs generated 
  // hit.xz = mix(hit.xz,hit.xz*rot(-t*.25),conf5);

  //get the coordinates around the torus and draw horizontal and vertical lines
  vec2 p = vec2(atan(hit.x,hit.z), atan(length(hit.xz)-1.-mix(1.,4.,sin(t-hit.y*2.)*.5+.5)*conf6,hit.y));
  col.xyz = vec3(1.-smoothstep(0.,.05,min(sin(t*4.*conf0+p.x*25.+p.y*50.), sin(t*4.*conf1-p.x*50.-p.y*25.))*.5+.5));

  return col;
}

void main() {
  vec2 p = uv*2.-1.;
  p.y/=rat;
  vec3 col = vec3(0);

  //a ray starting at 0,0,-1 facing 0,0,0
  vec3 rd = normalize(vec3(p.xy,.5));
  vec3 ro = vec3(0,0,-1);

  //time offset for each rgb channel
  float cir = mix(.0,5., (sin(t)*.5+.5)*conf7);

  //base refraction index
  float irb = mix(.5,sin(t-p.y-p.x*.5)*.5+.25,conf2);

  //IRV/IRD define how many times the scene is sampled for the refraction/abberation effect
  //changing these can produce nicer rainbows, but it can also freeze your browser
  #define IRV .01
  #define IRD .125

  for(float i = 0.; i < IRV; i+=IRV*IRD) {
    col.x += scene(ro,rd,t+i*cir, irb+i).x;
    col.y += scene(ro,rd,t+(i-IRV*.5)*cir, irb+(i-IRV*.5)).y;
    col.z += scene(ro,rd,t-i*cir, irb-i).z;
  }
  col*=IRD;

  //mellow everything so its not pure black and white.
  col.xyz*=vec3(.9,.9,.9);
  col.xyz+=vec3(.125);

  gl_FragColor = vec4(col,1);
}
`,
    ];

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works

      w = Math.min(p.windowWidth / 10, (p.windowHeight / 10) * rat);
      h = w / rat;
      p.colorMode(p.RGB, 1, 1, 1, 1);
      p.pixelDensity(1);
      p.setAttributes("antialias", true);
      canvas = p.createCanvas(w, h, p.WEBGL);

      p.flex({
        container: { parent: MathTextbookWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(2.5);

      sh = new p5.Shader(undefined, ...shSrc);
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      //increments the timer and checks if we crossed a "cycle" threshold this frame
      //if so discard the first conf in the queue and see if we need to generate a new one
      if (((t / cycle) | 0) != (((t += p.deltaTime / 1000) / cycle) | 0)) {
        confQueue.shift();
        if (confQueue.length == 1) confQueue.push(randConf());
      }

      //make a mix of the first and second conf in the queue
      let conf = mix(confQueue[0], confQueue[1], ss((t % cycle) / cycle));

      p.scale(w * 0.5, h * 0.5);
      p.background(0);
      p.shader(sh);
      sh.setUniform("rat", rat);
      sh.setUniform(
        "pd",
        [w, h].map((x) => 1 / x),
      );
      sh.setUniform("t", t);
      conf.map((x, i) => sh.setUniform("conf" + i, x));
      p.rect(0, 0, 0, 0);
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

export default MathTextbookSketch;
