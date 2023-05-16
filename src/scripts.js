import P5 from 'p5';

class RandomWalker {
    constructor(x, y, p5) {
        this.position = p5.createVector(x, y);

        this.maxStepHistory = 10;
        this.stepHistory = [];
        this.maxStep = 15;

        this.p5 = p5;
    }

    draw() {
        this.stepHistory.forEach((step, index) => {
            this.p5.fill(255);
            this.p5.ellipse(step.x, step.y, index, index);
        })
    }

    update() {
        const newX = this.position.x + this.p5.random(-15, 15);
        const newY = this.position.y + this.p5.random(-15, 15);

        if (newX > 0 && newX < this.p5.windowWidth) {
            this.position.x = newX;
        }

        if (newY > 0 && newY < this.p5.windowHeight) {
            this.position.y = newY;
        }

        if (this.stepHistory.length >= this.maxStepHistory) {
            this.stepHistory.shift();
        }

        this.stepHistory.push({ x: this.position.x, y: this.position.y });

        this.maxStep += 1;
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

    //const walker = new RandomWalker(400, 400, p5);

    const generate5Walkers = () => {
        for (i = 0; i < 5; i++) {
            walker = new RandomWalker(p5.random([-100, 100]), p5.random([-100, 100]), p5);
            walkers.push(walker);
        }
    }

    let walkers = [];
    let walker = null;

    p5.mousePressed = () => {
        if (walkers.length < 20) {
            walker = new RandomWalker(p5.mouseX, p5.mouseY, p5);
            walkers.push(walker)
            console.log(walkers.length)
        }

        if (walkers.length < 5)
            generate5Walkers();
    }

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);

        if (walkers.length < 5)
            generate5Walkers();
    };

    p5.draw = () => {
        p5.background(51);

        p5.stroke(255);
        p5.strokeWeight(10);

        particle.draw();
        particle.update();

        walkers.forEach(w => {
            w.draw();
            w.update();
        })
    };
};

new P5(sketch);