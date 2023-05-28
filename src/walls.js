class Walls {
    constructor() {}

    setup() {
        // walls (top right and bottom)
        walls = new Sprite([[0,0], [BG_WIDTH_PX,0], [BG_WIDTH_PX,BG_HEIGHT_PX], [0,BG_HEIGHT_PX]]);
        walls.collider = 'static';
        // left wall
        new Sprite([[0,0], [0,BG_HEIGHT_PX]]).collider = 'static';
    }
}