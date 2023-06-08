DRIBBLER_WIDTH = 30;
DRIBBLER_HEIGHT = 10;
DRIBBLER_INSET = 5;
class Robot {
    static robots = [];
    static robotDribbling = -1;
    initialX;
    initialY;
    teamColor;
    index;
    img;
    sprite;
    frontDribbler;
    backDribbler;
    canFrontDribble;
    canBackDribble;
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

    // Setup the robot
    setup() {
        const ball = Ball.ball;
        this.img.resize(22 * CM_TO_PX, 22 * CM_TO_PX);
        this.sprite = new Sprite(this.initialX, this.initialY);
        this.sprite.height = this.img.height;
        this.sprite.width = this.img.width;
        this.sprite.d = this.img.height;
        this.sprite.color = 'pink';
        this.sprite.addImage(this.img);
        this.sprite.rotation = radians(90);
        // IGNORE THE X Y COORDS OF THE DRIBBLERS, JUST RANDO VALUES
        this.frontDribbler = new Sprite(this.initialX + 0, this.initialY + -35, DRIBBLER_WIDTH, DRIBBLER_HEIGHT);
        this.sprite.overlaps(this.frontDribbler);
        this.frontDribbler.overlaps(ball.sprite);
        this.frontDribbler.color.setAlpha(0);
        this.backDribbler = new Sprite(this.initialX + 0, this.initialY + 35, DRIBBLER_WIDTH, DRIBBLER_HEIGHT);
        this.sprite.overlaps(this.backDribbler);
        this.backDribbler.overlaps(ball.sprite);
        this.backDribbler.color.setAlpha(0);
    }

    static setupAll() {
        Robot.robots.forEach(robot => {
            robot.setup();
        });
    }

    // Reset robot
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

    // Update robot
    onDraw(robotIndex) {
        const ball = Ball.ball;
        // Check if this robot is selected
        if (robotIndex === this.index) {
            // Robot is selected
            // Move robot to mouse
            if (mouse.presses()) {
                this.sprite.moveTo(mouse, 8);
            }
            // Highlight selected robot
            this.sprite.text="OWO";
            this.sprite.textColor = this.teamColor === "blue" ? "red" : 'white';
            this.sprite.textSize = 30;
        } else {
            // Robot is not selected
            // Remove highlight
            this.sprite.text="";
        }

        // Check if this robot is dribbling
        if (this.index === Robot.robotDribbling) {
            // Robot is dribbling
            let pi = Math.PI;
            let angle = this.sprite.rotation * (pi/180);

            // Check if ball is in front or back dribbler
            if (this.canFrontDribble > 0) {
                // Ball in front dribbler
                // Move ball in front dribbler
                ball.sprite.x = this.sprite.x + Math.cos(angle - pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - 2*DRIBBLER_INSET);
                ball.sprite.y = this.sprite.y + Math.sin(angle - pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - 2*DRIBBLER_INSET);
            } else if (this.canBackDribble > 0) {
                // Ball in back dribbler
                // Move ball in back dribbler
                ball.sprite.x = this.sprite.x + Math.cos(angle + pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - 2*DRIBBLER_INSET);
                ball.sprite.y = this.sprite.y + Math.sin(angle + pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - 2*DRIBBLER_INSET);
            }

            // Move ball with robot
            ball.sprite.vel.x = 0;
            ball.sprite.vel.y = 0;
            this.sprite.overlaps(ball.sprite);
        } else {
            // Stop sprite overlapping the ball
        }

        // Update debug outline
        this.sprite.debug = this.frontDribbler.overlapping(ball.sprite) || this.backDribbler.overlapping(ball.sprite);
        // Update dribbler overlap
        this.canFrontDribble = this.frontDribbler.overlapping(ball.sprite);
        this.canBackDribble = this.backDribbler.overlapping(ball.sprite);

        // Rotate the player to face 90 degrees from the ball
        this.sprite.rotateTowards(ball.sprite, 0.1, 90);   
        // Move dribblers with robot
        this.moveDribblers();
    }

    static onDrawAll(robotIndex) {
        Robot.robots.forEach(robot => {
            robot.onDraw(robotIndex);
        });
    }

    // Move dribblers with robot
    moveDribblers() {
        let pi = Math.PI;
        let angle = this.sprite.rotation * (pi/180);

        this.frontDribbler.x = this.sprite.x + Math.cos(angle - pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - DRIBBLER_INSET);
        this.frontDribbler.y = this.sprite.y + Math.sin(angle - pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - DRIBBLER_INSET);

        this.frontDribbler.rotation = this.sprite.rotation;

        this.backDribbler.x = this.sprite.x + Math.cos(angle + pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - DRIBBLER_INSET);
        this.backDribbler.y = this.sprite.y + Math.sin(angle + pi/2) * (this.sprite.d/2 + DRIBBLER_HEIGHT/2 - DRIBBLER_INSET);

        this.backDribbler.rotation = this.sprite.rotation;
    }

    // Set the robot that is dribbling
    dribble(robotIndex) {
        if (robotIndex === this.index) {
            if (this.canFrontDribble || this.canBackDribble) {
                Robot.robotDribbling = this.index;
            }
        }
    }

    static dribbleAll(robotIndex) {
        Robot.robots.forEach(robot => {
            robot.dribble(robotIndex);
        })
    }
}