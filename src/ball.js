class Ball {
    static ball;
    img;
    sprite;
    
    constructor() {
        Ball.ball = this;
    }

    preload() {
        this.img = loadImage('./public/ball.png');
    }

    setup() {
        this.img.resize(7.4*CM_TO_PX, 7.4*CM_TO_PX);
        this.sprite = new Sprite(BG_WIDTH_PX/2, BG_HEIGHT_PX/2);
        this.sprite.height = this.img.height;
        this.sprite.width = this.img.width;
        this.sprite.d = this.img.height;
        this.sprite.drag = 0.1;
        this.sprite.rotationDrag = 1;
        this.sprite.addImage(this.img);
    }

    reset() {
        this.sprite.pos = {x: BG_WIDTH_PX/2, y: BG_HEIGHT_PX/2};
		this.sprite.vel = {x: 0, y: 0};
		this.sprite.acc = {x: 0, y: 0};
		this.sprite.rotateTo(0, 15);
    }
}