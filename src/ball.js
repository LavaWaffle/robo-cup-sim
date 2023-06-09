const rayCount = 36;
class Ball {
    static ball;
    img;
    sprite;
    rayLines = [];

    // Singleton
    constructor() {
        Ball.ball = this;
    }

    // Preload the ball sprite
    preload() {
        this.img = loadImage('./public/ball.png');
    }

    // Setup the ball
    setup() {
        this.img.resize(7.4*CM_TO_PX, 7.4*CM_TO_PX);
        this.sprite = new Sprite(BG_WIDTH_PX/2, BG_HEIGHT_PX/2);
        this.sprite.height = this.img.height;
        this.sprite.width = this.img.width;
        this.sprite.d = this.img.height;
        this.sprite.drag = 0.1;
        this.sprite.rotationDrag = 1;
        this.sprite.addImage(this.img);

        // Create ray trace lines
        for (let i = 0; i < rayCount; i++) {
            const angle = i * 360 / rayCount;
            const owo = new Sprite(this.sprite.x, this.sprite.y, [[cos(angle)*BG_HEIGHT_PX*1.2, sin(angle)*BG_HEIGHT_PX*1.2]])
            owo.overlaps(this.sprite);
            owo.color.setAlpha(0);
            this.rayLines.push(owo);
        }
    }

    // setupAfterRobots
    setupAfterRobots() {
        // Make ray trace lines overlap robots
        for (let i = 0; i < rayCount; i++) {
            Robot.robots.forEach(robot => {
                this.rayLines[i].overlaps(robot.sprite);
            });
        }
    }

    // Update the ball
    onDraw() {
        // raytracing stuff idk lol
        // Remove vision from all robots
        Robot.robots.forEach(robot => robot.canSeeBall = false);
        
        // Loop through ray trace lines
        for (let i = 0; i < rayCount; i++) {
            // Move ray trace lines to ball
            this.rayLines[i].x = this.sprite.x;
            this.rayLines[i].y = this.sprite.y;

            // Check if ray trace lines are overlapping robots
            const robotsOverlapping = [];
            Robot.robots.forEach(robot => {
                if (this.rayLines[i].overlapping(robot.sprite)) {
                    robotsOverlapping.push(robot);
                }
            })

            // How many robots in ray trace line?
            if (robotsOverlapping.length === 1) {
                // Only one robot, so it can see the ball
                robotsOverlapping[0].canSeeBall = true;
            } else if (robotsOverlapping.length > 1) {
                // Multiple robots, so find the closest one
                // Caculate the closest robot to the ball
                let closest = robotsOverlapping[0];
                // Loop through all the robots
                robotsOverlapping.forEach(robot => {
                    // Calculate distances
                    const currDistance = Math.sqrt(Math.pow(this.sprite.x - robot.sprite.x, 2) + Math.pow(this.sprite.y - robot.sprite.y, 2));
                    const closestDistance = Math.sqrt(Math.pow(this.sprite.x - closest.sprite.x, 2) + Math.pow(this.sprite.y - closest.sprite.y, 2));
                    // Is this robot closer to the ball?
                    if (currDistance < closestDistance) {
                        // It is, so it's the closest
                        closest = robot;
                    }
                })
                // Closest robot can see the ball
                closest.canSeeBall = true;
            }
        }
    }

    // Reset ball position and velocity
    reset() {
        this.sprite.pos = {x: BG_WIDTH_PX/2, y: BG_HEIGHT_PX/2};
		this.sprite.vel = {x: 0, y: 0};
		this.sprite.rotateTo(0, 15);
    }
}