class Robot {
    static robots = [];
    initialX;
    initialY;
    teamColor;
    index;
    img;
    sprite;
    frontDribbler;
    backDribbler;
    dribblerWidth = 30;
    dribblerHeight = 20;
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
        // IGNORE THE X Y COORDS OF THE DRIBBLERS, JUST RANDO VALUES
        this.frontDribbler = new Sprite(this.initialX + 0, this.initialY + -35, 30, 20);
        this.sprite.overlaps(this.frontDribbler);
        this.backDribbler = new Sprite(this.initialX + 0, this.initialY + 35, 30, 20);
        this.sprite.overlaps(this.backDribbler);
    }

    static setupAll() {
        Robot.robots.forEach(robot => {
            robot.setup();
        });
    }

    reset() {
        this.sprite.pos = { x: this.initialX, y: this.initialY };
        this.sprite.vel = { x: 0, y: 0 };
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

        this.sprite.debug = this.frontDribbler.overlapping(ball.sprite); 
        // rotate the player to face 90 degrees from the ball
        this.sprite.rotateTowards(ball.sprite, 0.1, 90);   
        
        this.moveDribblers(ball);
    }

    static onDrawAll(robotIndex, mouse, ball) {
        Robot.robots.forEach(robot => {
            robot.onDraw(robotIndex, mouse, ball);
        });
    }

    moveDribblers(ball) {
        var pi = Math.PI;
        let angle = this.sprite.rotation * (pi/180);

        this.frontDribbler.remove();
        this.frontDribbler = new Sprite(
            this.sprite.x + Math.cos(angle - pi/2) * (this.sprite.d/2 + 20/2),
            this.sprite.y + Math.sin(angle - pi/2) * (this.sprite.d/2 + 20/2),
            this.dribblerWidth,
            this.dribblerHeight
        );
        this.frontDribbler.overlaps(ball.sprite);
        this.sprite.overlaps(this.frontDribbler);
        this.frontDribbler.rotation = this.sprite.rotation;

        this.backDribbler.remove();
        this.backDribbler = new Sprite(
            this.sprite.x + Math.cos(angle + pi/2) * (this.sprite.d/2 + 20/2),
            this.sprite.y + Math.sin(angle + pi/2) * (this.sprite.d/2 + 20/2),
            this.dribblerWidth,
            this.dribblerHeight
        );
        this.frontDribbler.overlaps(ball.sprite);
        this.sprite.overlaps(this.backDribbler);
        this.backDribbler.rotation = this.sprite.rotation;
    }
}