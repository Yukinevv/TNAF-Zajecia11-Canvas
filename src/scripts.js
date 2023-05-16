import P5 from 'p5';

class RandomWalker {
    constructor(x, y, p5) {
        this.position = p5.createVector(x, y);

        this.p5 = p5
    }

    draw() {
        this.p5.point(this.position.x, this.position.y);
    }

    update() {
        const newX = this.position.x + this.p5.random([-1, 1]);
        const newY = this.position.y + this.p5.random([-1, 1]);

        if (newX > 0 || newX < window.innerWidth) {
            this.position.x = newX;
        }

        if (newY > 0 || newY < window.innerHeight) {
            this.position.y = newY;
        }
    }
}

class Particle {
    constructor(x, y, p5) {
        this.position = p5.createVector(x, y);
        this.direction = p5.createVector(3, 3);

        this.p5 = p5;
    }

    draw() {
        this.p5.point(this.position.x, this.position.y);
    }

    update() {
        if (this.position.y > this.p5.height || this.position.y < 0) {
            this.direction.y *= -1;
        }

        if (this.position.x > this.p5.width || this.position.x < 0) {
            this.direction.x *= -1;
        }

        this.position.add(this.direction);
    }
}

const sketch = p5 => {
    const particle = new Particle(0, 0, p5);

    const walker = new RandomWalker(400, 400, p5);

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
    };

    p5.draw = () => {
        p5.background(51);

        p5.stroke(255);
        p5.strokeWeight(10);

        particle.draw();
        particle.update();

        walker.draw();
        walker.update();
    };
};

new P5(sketch);