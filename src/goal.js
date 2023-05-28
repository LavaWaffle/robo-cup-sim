class Goal {
    color
    walls;
    area;

    constructor(color) {
        this.color = color;
    }

    setup(ballSprite) {
        // goal walls
        if (this.color === 'blue') {
            this.walls = new Sprite(190, 0, [[0, 38], [5, 0], [0, -(38-15)], [190, 0], [0, 38-15], [5, 0], [0, -38]], 'static');
            this.area = new Sprite(195, 15, [[0, 38-15], [385-195, 0], [0, -(38-15)], [-(385-195), 0]], 'static');
        } else if (this.color === 'orange') {
            this.walls = new Sprite(190, 775, [[0, -38], [5, 0], [0, 38-15], [190, 0], [0, -(38-15)], [5, 0], [0, 38]], 'static');
            this.area = new Sprite(195, 738, [[0, -(38-15)], [385-195, 0], [0, 38-15], [-(385-195), 0]], 'static');
        }

        this.area.x += this.area.width/2;
        this.area.y += this.area.height/2;
        this.area.color.setAlpha(0);
        ballSprite.overlaps(this.area);
    }

    onDraw(ball) {
        if (ball.sprite.overlaps(this.area)) {
            ball.reset();
            return true;
        }
        return false;
    }
}
