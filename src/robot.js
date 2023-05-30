class Robot {
    static robots = [];
    initialX;
    initialY;
    teamColor;
    index;
    img;
    sprite;
    constructor(color, x, y) {
        this.teamColor = color;
        this.initialX = x;
        this.initialY = y;
        this.index = Robot.robots.length;
        Robot.robots.push(this);
    }

    preload() {
        if (this.teamColor === "blue") {
            this.img = loadImage('./public/robot.png');
        } else {
            this.img = loadImage('./public/enemy.png')
        }
    }

    static preloadAll() {
        Robot.robots.forEach(robot => {
            robot.preload();
        });
    }

    setup() {
        this.img.resize(22 * CM_TO_PX, 22 * CM_TO_PX);
        this.sprite = new Sprite(this.initialX, this.initialY);
        this.sprite.height = this.img.height;
        this.sprite.width = this.img.width;
        this.sprite.d = this.img.height;
        this.sprite.color = 'pink';
        this.sprite.addImage(this.img);
        this.sprite.rotation = radians(90);
    }

    static setupAll() {
        Robot.robots.forEach(robot => {
            robot.setup();
        });
    }

    reset() {
        this.sprite.pos = { x: this.initialX, y: this.initialY };
        this.sprite.vel = { x: 0, y: 0 };
        this.sprite.acc = { x: 0, y: 0 };
        this.sprite.rotateTo(0, 15);
    }

    static resetAll() {
        Robot.robots.forEach(robot => {
            robot.reset();
        });
    }

    onDraw(robotIndex, mouse, ball) {
        if (robotIndex == this.index) {
            if (mouse.presses()) {
                this.sprite.moveTo(mouse, 8);
            }
            // draw outline around selected robot
            this.sprite.text="OWO";
            this.sprite.textColor = this.teamColor == "blue" ? "red" : 'white';
            this.sprite.textSize = 30;
        } else {
            this.sprite.text="";
        }

        // rotate the player to face 90 degrees from the ball
        this.sprite.rotateTowards(ball.sprite, 0.1, 90);
    }

    static onDrawAll(robotIndex, mouse, ball) {
        Robot.robots.forEach(robot => {
            robot.onDraw(robotIndex, mouse, ball);
        });
    }
}