import { useEffect, useId } from 'react';
import P5 from 'p5';

type SketchCleanup = { cleanup: () => void };

const visualisation = ({ width, height }: { width: number, height: number }): SketchCleanup => {
  const sketch = (p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(width, height);
    };
    p5.draw = () => {
      p5.line(0, 0, width, height);
    };
  };

  const p5 = new P5(sketch);

  return {
    cleanup: p5.remove,
  };
};

export const WorkingDemonstration = ({ width, height }: { width: number, height: number }) => {
  const id = useId();

  useEffect(() => {
    const { cleanup } = visualisation({
        width,
      height,
    });

    return cleanup; // This removes the canvas when the component is rerendered.
    }, []);

  return <div id={id}></div>;
};