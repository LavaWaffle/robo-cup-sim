class Robot {
    img;
    sprite;
    constructor() {}

    preload() {
        this.img = loadImage('./public/robot.png');
    }

    setup() {
        this.img.resize(22*CM_TO_PX, 22*CM_TO_PX);
        this.sprite = new Sprite(BG_WIDTH_PX/2, BG_HEIGHT_PX/2);
        this.sprite.height = this.img.height;
        this.sprite.width = this.img.width;
        this.sprite.d = this.img.height;
        this.sprite.addImage(this.img);
        this.sprite.rotation = radians(90);
    }

    reset() {
        this.sprite.pos = {x: BG_WIDTH_PX/2, y: BG_HEIGHT_PX/2};
		this.sprite.vel = {x: 0, y: 0};
		this.sprite.acc = {x: 0, y: 0};
		this.sprite.rotateTo(0, 15);
    }

    onDraw(mouse, ball) {
        if (mouse.presses()) {
            this.sprite.moveTo(mouse, 8);
        }
    
        // rotate the player to face 90 degrees from the ball
        this.sprite.rotateTowards(ball.sprite, 0.1, 90);
    }
}