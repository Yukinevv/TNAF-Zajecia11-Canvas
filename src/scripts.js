import P5 from 'p5';

const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
    };

    p5.draw = () => {
        p5.background(51);
    };
};

new P5(sketch);
