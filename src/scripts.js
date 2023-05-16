import P5 from 'p5';

const MAX_STEP_HISTORY = 15;
const MAX_STEP_SIZE = 10;
const MAX_WALKERS_COUNT = 20;
const INIT_WALKERS_COUNT = 10;

class RandomOrganism {
    constructor(x, y, p5) {
        this.position = p5.createVector(x, y);
        this.color = p5.createVector(p5.random(255), p5.random(255), p5.random(255));
        this.p5 = p5;
        this.maxStepHistory = MAX_STEP_HISTORY;
        this.level = 1;
        this.maxStep = MAX_STEP_SIZE;
        this.stepHistory = [];
        this.stepCount = 0;
        this.isAlive = true;
    }

    die() {
        this.isAlive = false;
    }

    update() {
        this.checkBoundaries();

        this.stepHistory.push(this.p5.createVector(this.position.x, this.position.y));

        this.position.x += this.p5.random(-this.maxStep, this.maxStep);
        this.position.y += this.p5.random(-this.maxStep, this.maxStep);

        this.stepCount++;

        if (this.stepCount % 10 === 0) {
            this.levelUp();
        }

        if (this.stepHistory.length > this.maxStepHistory) {
            this.stepHistory.splice(0, 1);
        }
    }

    levelUp() {
        this.level++;
        this.maxStepHistory++;
    }

    scan(walkers, myIndex) {
        console.log('walkers', walkers);
        console.log('walkers', myIndex);

        walkers.forEach((walker, index) => {
            if (myIndex === index) {
                console.log('this is me');
                return;
            }

            if (!walker.isAlive) {
                console.log('dead');
                return;
            }

            console.log('dist', this.position.dist(walker.position));

            if (this.position.dist(walker.position) < 10) {
                this.absorb(walker);
                walker.die();
            }
        });
    }

    absorb(walker) {
        this.level += walker.level;
        this.maxStepHistory += walker.level;

        for (let i; i <= walker.level; i++) {
            this.stepHistory.push(
                this.p5.createVector(
                    this.p5.random(-this.position.x - 15, this.position.x + 15),
                    this.p5.random(-this.position.y - 15, this.position.y + 15),
                ),
            );
        }
    }

    draw() {
        this.p5.stroke(1);
        this.p5.fill(this.color.x, this.color.y, this.color.z);
        this.p5.ellipse(this.position.x, this.position.y, 20, 20);

        this.stepHistory.forEach((step, index) => {
            this.p5.ellipse(step.x, step.y, index > 20 ? 20 : index);
        });
    }

    checkBoundaries() {
        if (this.position.y > this.p5.height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = this.p5.height;
        }
        if (this.position.x > this.p5.width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = this.p5.width;
        }
    }
}

const sketch = p5 => {
    let walkers = [];

    for (let i = 0; i < INIT_WALKERS_COUNT; i++) {
        walkers.push(new RandomOrganism(p5.random(100, 800), p5.random(100, 800), p5));
    }

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
        p5.background(51);
    };

    p5.draw = () => {
        p5.background(51);

        walkers.forEach((walker, index) => {
            walker.draw();
            walker.update();
            walker.scan(walkers, index);
        });

        walkers = walkers.filter(walker => walker.isAlive);
    };

    p5.mousePressed = () => {
        if (walkers.length < MAX_WALKERS_COUNT) {
            walkers.push(new RandomOrganism(p5.mouseX, p5.mouseY, p5));
        }
    };
};

new P5(sketch);