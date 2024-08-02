import React from "react";
import p5 from "p5";
import { mountFlex } from "p5.flex";

class LettersSketch extends React.Component {
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

    const ANCHURA = 800; // Set a universal width for this component
    const ALTURA = 800; // Set a universal height for this component

    const md = {
      // Paper
      paper: {
        notebook: {
          cantLines: 15,
          cantSeps: 28,
        },
        paper: {
          rugosity: 9000,
        },
      },
      // Dictionary
      mode: "dictionary",
      dictData: {
        addUppercase: true,
        addSymbols: true,
      },
      // Glyphs
      typeGlyph: "domain",
      glyph: {
        domain: {
          curvesPerGlyph: 2,
          cantCentroids: 20,
          repeatCentroid: true,
          chaos: 5,
        },
        simple: {},
      },
      isIntense: true,
      letter:
        "Borgotaba. Los viscoleantes toves, rijando en la solea, tadralaban… Misébiles estaban los borgoves y algo momios los verdos bratchilbaban. ¡Cuidado, hijo, con el Fablistanón! ¡Con sus dientes y garras, muerde, apresa! ¡Cuidado con el pájaro Sonsón y rehuye al frumioso Magnapresa!",
      rows: 12,
      cols: 25,
      factorGlyphSize: 18.2,
      strokeWeight: 2,
    };

    function getCentroid(data) {
      const size = data.size ? data.size : 1;
      const region = Math.ceil(size / data.cantCentroids);
      const r = region * (data.i + Math.random());
      const x = 0.5 * r * Math.cos(Math.PI * (2 * Math.random() + 0.75));
      const y = r * Math.sin(2 * Math.PI * Math.random());

      return [x, y];
    }

    function drawPaper(data) {
      const CANT_LINES = data.cantLines ? data.cantLines : 20;
      const CANT_SEPARATIONS = data.cantSeps ? data.cantSeps : 20;
      const BASE_H = 0;
      const BASE_S = 0;
      const BASE_B = 95;
      const spacingX = Math.floor(data.dimensions.width / CANT_SEPARATIONS);
      const spacingY = Math.floor(data.dimensions.height / CANT_LINES);
      const marginX = spacingX * 0.5;
      const marginY = Math.floor(data.dimensions.width / CANT_LINES);

      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(p.color(BASE_H, BASE_S, BASE_B));

      for (
        let x = marginX;
        x < data.dimensions.width - marginX;
        x += spacingX
      ) {
        for (
          let y = spacingY * 0.25;
          y < data.dimensions.height - marginY;
          y += spacingY
        ) {
          p.strokeWeight(2);
          p.stroke(p.color(220, 80, 60, 95));
          p.line(x, y + spacingY, x + spacingX, y + spacingY);
        }
      }

      p.stroke(p.color(220 - 5, 80 - 15, 60 + 15, 95));
    }

    let glyphData, dictionary, modes;
    let spacingX, spacingY, marginX, marginY;
    let x, y;
    let isFinished = false;
    let seed = 1234;
    let paperData;

    const getGlyph = (type, data) => {
      const getTypes = {
        simple: (data) => {
          const instructions = [];
          const rand = Math.random();

          let instruction;

          // Set random bezier control points
          const control1 = {
            x: Math.floor(Math.random(-data.spacingX * 2, data.spacingX * 2)),
            y: Math.floor(
              Math.random(-data.spacingY * 1.25, data.spacingY * 1.25),
            ),
          };
          const control2 = {
            x: Math.floor(Math.random(-data.spacingX / 2, data.spacingX / 3)),
            y: Math.floor(Math.random(-data.spacingY / 3, data.spacingY / 2)),
          };

          instruction = {
            type: "curve",
            vertex: [
              [0, 0 + data.spacingY],
              [0 + control1.x, 0 + control1.y],
              [0 + control2.x, 0 + control2.y],
              [0 + data.spacingX, 0 + data.spacingY],
            ],
          };
          instructions.push(instruction);

          if (rand < 0.1) {
            // Line over the char
            instruction = {
              type: "line",
              vertex: [
                [0, 0 + data.spacingY / 2],
                [0 + data.spacingX, 0 + data.spacingY / 2],
              ],
            };
            instructions.push(instruction);
          }
          if (rand > 0.6 && rand < 0.65) {
            // Two points
            instruction = {
              type: "point",
              vertex: [[0, 0 + data.spacingY * 0.25]],
              style: {
                strokeWeight: data.strokeWeight ? data.strokeWeight : 5,
              },
            };
            instructions.push(instruction);
            instruction = {
              type: "point",
              vertex: [[0 + data.spacingX, 0 + data.spacingY * 0.25]],
              style: {
                strokeWeight: data.strokeWeight ? data.strokeWeight : 5,
              },
            };
            instructions.push(instruction);
          }

          return instructions;
        },
        domain: (data) => {
          const curvesPerGlyph = data.curvesPerGlyph ? data.curvesPerGlyph : 1;
          const baseX = 0;
          const baseY = 0 + data.spacingY * 0.75;
          const pStart = [0, 0];
          const pEnd = [0 + data.spacingX, 0];
          const chaos = data.chaos ? data.chaos : 0;
          const repeatCentroid = data.repeatCentroid
            ? data.repeatCentroid
            : false;
          const instructions = [];

          let instruction;
          let centroids = [...data.centroids];
          let c1, c2, a1, a2, ran;

          for (let i = 0; i < curvesPerGlyph; i++) {
            ran = Math.random();

            a1 =
              ran > 0.12 || i === 0
                ? pStart
                : centroids[Math.floor(Math.random(0, centroids.length - 1))];
            centroids = repeatCentroid
              ? centroids
              : centroids.filter((c) => {
                  return c !== a1;
                });

            c1 = centroids[Math.floor(Math.random(0, centroids.length - 1))];
            centroids = repeatCentroid
              ? centroids
              : centroids.filter((c) => {
                  return c !== c1;
                });

            c2 = centroids[Math.floor(Math.random(0, centroids.length - 1))];
            centroids = repeatCentroid
              ? centroids
              : centroids.filter((c) => {
                  return c !== c2;
                });

            a2 =
              ran > 0.15 || i === curvesPerGlyph - 1
                ? pEnd
                : centroids[Math.floor(Math.random(0, centroids.length - 1))];

            instruction = {
              type: "curve",
              vertex: [
                [baseX + a1[0], baseY + a1[1]],
                [
                  baseX + c1[0] * (chaos > 2 && Math.random() > 0.5 ? -1 : 1),
                  baseY + c1[1] * (chaos > 1 && Math.random() > 0.5 ? -1 : 1),
                ],
                [
                  baseX + c2[0] * (chaos > 3 && Math.random() > 0.5 ? -1 : 1),
                  baseY + c2[1] * (chaos > 0 && Math.random() > 0.5 ? -1 : 1),
                ],
                [baseX + a2[0], baseY + a2[1]],
              ],
            };
            instructions.push(instruction);
          }

          return instructions;
        },
      };
      const glyph = getTypes[type]
        ? getTypes[type](data)
        : getTypes["simple"](data);

      return glyph;
    };

    const makeDictionary = (type, dictData, glyphData) => {
      const symbols = {
        "¡": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.2,
            y: data.spacingY * 0.4,
          };
          const control2 = {
            x: data.spacingX * 0.6,
            y: data.spacingY * 0.3,
          };

          let instruction = null;

          instruction = {
            type: "curve",
            vertex: [
              [data.spacingX * 0.4, data.spacingY],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.6, data.spacingY],
            ],
          };
          instructions.push(instruction);

          return instructions;
        },
        "!": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.8,
            y: data.spacingY * 0.6,
          };
          const control2 = {
            x: data.spacingX * 0.2,
            y: data.spacingY * 0.7,
          };

          let instruction = null;

          instruction = {
            type: "curve",
            vertex: [
              [data.spacingX * 0.6, 0],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.4, 0],
            ],
          };
          instructions.push(instruction);

          return instructions;
        },
        "¿": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.4,
            y: data.spacingY * 0.25,
          };
          const control2 = {
            x: data.spacingX * 0.6,
            y: data.spacingY * 0.25,
          };

          let instruction = null;

          instruction = {
            type: "curve",
            vertex: [
              [data.spacingX * 0.2, data.spacingY * 0.05],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.8, data.spacingY * 0.25],
            ],
          };
          instructions.push(instruction);

          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.6, data.spacingY * 0.1]],
            style: {
              strokeWeight: data.strokeWeight ? data.strokeWeight : 1,
            },
          };
          instructions.push(instruction);

          return instructions;
        },
        "?": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.6,
            y: data.spacingY * 0.75,
          };
          const control2 = {
            x: data.spacingX * 0.4,
            y: data.spacingY * 0.75,
          };

          let instruction = null;

          instruction = {
            type: "curve",
            vertex: [
              [data.spacingX * 0.8, data.spacingY * 0.95],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.2, data.spacingY * 0.75],
            ],
          };
          instructions.push(instruction);

          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.4, data.spacingY * 0.9]],
            style: {
              strokeWeight: data.strokeWeight ? data.strokeWeight : 1,
            },
          };
          instructions.push(instruction);

          return instructions;
        },
        ",": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.6,
            y: data.spacingY * 0.85,
          };
          const control2 = {
            x: data.spacingX * 0.4,
            y: data.spacingY * 0.75,
          };

          let instruction = null;

          instruction = {
            type: "curve",
            vertex: [
              [data.spacingX * -0.1, data.spacingY * 1.2],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.3, data.spacingY * 0.8],
            ],
          };
          instructions.push(instruction);

          return instructions;
        },
        ".": (data) => {
          const instructions = [];

          let instruction = null;

          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.2, data.spacingY * 0.85]],
            style: {
              strokeWeight: data.strokeWeight ? data.strokeWeight : 1,
            },
          };
          instructions.push(instruction);
          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.4, data.spacingY * 0.6]],
            style: {
              strokeWeight: data.strokeWeight ? data.strokeWeight : 1,
            },
          };
          instructions.push(instruction);
          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.2, data.spacingY * 0.45]],
            style: {
              strokeWeight: data.strokeWeight ? data.strokeWeight : 1,
            },
          };
          instructions.push(instruction);

          return instructions;
        },
        ":": (data) => {
          const instructions = [];
          const control1 = {
            x: data.spacingX * 0.6,
            y: data.spacingY * 0.75,
          };
          const control2 = {
            x: data.spacingX * 0.4,
            y: data.spacingY * 0.75,
          };

          let instruction = null;

          instruction = {
            type: "curve_messy",
            vertex: [
              [data.spacingX * 0.3, data.spacingY * 0.15],
              [control1.x, control1.y],
              [control2.x, control2.y],
              [data.spacingX * 0.3, data.spacingY * 0.85],
            ],
          };
          instructions.push(instruction);

          instruction = {
            type: "circle_messy",
            vertex: [[data.spacingX * 0.2, data.spacingY * 0.5]],
            style: {
              strokeWeight: data.strokeWeight
                ? data.strokeWeight
                : Math.floor(4 * Math.random()),
            },
          };
          instructions.push(instruction);

          return instructions;
        },
      };
      const dict = {};

      for (let i = "a".codePointAt(); i < "z".codePointAt(); i++) {
        const c = String.fromCharCode(i);

        dict[c] = getGlyph(type, glyphData);
      }
      if (dictData.addUppercase) {
        for (let i = "A".codePointAt(); i < "Z".codePointAt(); i++) {
          const c = String.fromCharCode(i);

          dict[c] = getGlyph(type, glyphData);
        }
      }
      if (dictData.addSymbols) {
        const symbolKeys = Object.keys(symbols);

        for (let i = 0; i < symbolKeys.length; i++) {
          const c = symbolKeys[i];

          dict[c] = symbols[c](glyphData);
        }
      }

      return dict;
    };

    const drawGlyph = (data, glyph) => {
      const instructions = glyph
        ? glyph
        : getGlyph(data.type ? data.type : "simple", data);

      const draws = {
        point: ({ x, y }, v) => {
          p.point(v[0][0] + x, v[0][1] + y);
        },
        circle: ({ x, y }, v) => {
          p.circle(v[0][0] + x, v[0][1] + y, ANCHURA * 0.1);
        },
        circle_messy: ({ x, y }, v) => {
          const FACTOR = 0.15;

          p.circle(
            v[0][0] * (1 + Math.random() * FACTOR) + x,
            v[0][1] * (1 + Math.random() * FACTOR) + y,
            ANCHURA * 0.015,
          );
        },
        line: ({ x, y }, v) => {
          p.beginShape(p5.LINES);
          p.vertex(v[0][0] + x, v[0][1] + y);
          p.vertex(v[1][0] + x, v[1][1] + y);
          p.endShape();
        },
        curve: ({ x, y }, v) => {
          p.bezier(
            v[0][0] + x,
            v[0][1] + y,
            v[1][0] + x,
            v[1][1] + y,
            v[2][0] + x,
            v[2][1] + y,
            v[3][0] + x,
            v[3][1] + y,
          );
        },
        curve_messy: ({ x, y }, v) => {
          const FACTOR = 0.75;

          p.bezier(
            v[0][0] * (1 - Math.random() * FACTOR) + x,
            v[0][1] * (1 - Math.random() * FACTOR) + y,
            v[1][0] * (1 + Math.random() * FACTOR) + x,
            v[1][1] * (1 + Math.random() * FACTOR) + y,
            v[2][0] * (1 - Math.random() * FACTOR) + x,
            v[2][1] * (1 + Math.random() * FACTOR) + y,
            v[3][0] * (1 + Math.random() * FACTOR) + x,
            v[3][1] * (1 - Math.random() * FACTOR) + y,
          );
        },
      };

      for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        const styleKeys = instruction.style
          ? Object.keys(instruction.style)
          : [];
        const pos = {
          x: data.x ? data.x : 0,
          y: data.y ? data.y : 0,
        };

        p.push();

        p.noFill();
        for (let j = 0; j < styleKeys.length; j++) {
          const key = styleKeys[j];

          //p.window[key](instruction.style[key]);
        }

        draws[instruction.type](pos, instruction.vertex);
        p.pop();
      }
    };

    mountFlex(p5);

    p.setup = () => {
      //Everyhting that normally happens in setup works
      paperData = {
        cantLines: 15,
        cantSeps: 28,
        dimensions: {
          x: 0,
          y: 0,
          width: ANCHURA,
          height: ALTURA,
        },
      };

      p.createCanvas(ANCHURA, ALTURA);

      p.flex({
        container: { parent: LettersWindow },
        canvas: { fit: p.FILL },
        stylePage: false,
      });

      p.pixelDensity(4);

      p.frameRate(20);
      p.randomSeed(seed);
      //drawPaper(paperData);
      p.describe(
        "A notebook-like background, containing incomprehensible text. Its characters' strokes get progressively wider as they approach the edge.",
      );

      spacingX = Math.floor(ANCHURA / md.cols);
      spacingY = Math.floor(ALTURA / md.rows);
      marginX = spacingX * 0.5;
      marginY = Math.floor(ALTURA / md.rows);
      x = marginX;
      y = spacingY * 0.25;

      // Specify a domain and get the points where the curves will gravitate towards to
      const centroids = [];

      for (let i = 0; i < md.glyph.domain.cantCentroids; i++) {
        centroids.push(
          getCentroid({
            size: spacingX * md.factorGlyphSize,
            cantCentroids: md.glyph.domain.cantCentroids,
            i,
          }),
        );
      }

      glyphData = {
        ...md.glyph[md.typeGlyph],
        spacingX,
        spacingY,
        centroids,
        idx: 0,
      };

      // Create a dictionary
      dictionary = makeDictionary(md.typeGlyph, md.dictData, glyphData);

      modes = {
        default: ({ x, y }, glyphData) => {
          const ran = Math.random();

          if (p.jumped || ran > 0.15) {
            glyphData.x = x;
            glyphData.y = y;
            glyphData.jumped = p.jumped;

            const glyph = p.getGlyph(md.typeGlyph, glyphData);

            drawGlyph(p, glyphData, glyph);
            glyphData.jumped = false;
          } else {
            glyphData.jumped = true;
          }
        },
        dictionary: ({ x, y }, glyphData) => {
          const c = md.letter[glyphData.idx];

          glyphData.x = x;
          glyphData.y = y;
          if (dictionary[c]) {
            drawGlyph(glyphData, dictionary[c]);
          }
          glyphData.idx++;
        },
      };
    };

    p.draw = () => {
      // And everything that normally goes in draw in here
      if (!isFinished) {
        p.push();
        if (md.isIntense) {
          p.strokeWeight(5);

          md.factorGlyphSize += 0.4 * Math.ceil((2 * x) / (ANCHURA - marginX));
        }
        modes[md.mode]({ x, y }, glyphData);
        p.pop();

        if (!md.letter[glyphData.idx] || md.letter[glyphData.idx] === "\n") {
          glyphData.idx++;
          isFinished = true;
        }
        if (x >= ANCHURA - marginX) {
          x = marginX;
          y += spacingY;
        } else {
          x += spacingX;
        }
      }

      //overlay.draw({size: sizes[md.size], addWatermark: false});
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

export default LettersSketch;
