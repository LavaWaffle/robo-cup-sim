class Walls {
    constructor() {}

    // Setup the walls
    setup() {
        // walls
        walls = new Sprite([[0,0], [BG_WIDTH_PX,0], [BG_WIDTH_PX,BG_HEIGHT_PX], [0,BG_HEIGHT_PX], [0,0]]);
        walls.collider = 'static';
        // don't fill in the walls
        walls.shape = 'chain';
    }
}