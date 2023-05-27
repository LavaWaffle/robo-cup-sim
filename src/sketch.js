let bg;

let ball = new Ball();

let robot = new Robot();

let walls;

let drawTime = 0;

function preload() {
	bg = loadImage('./public/field.png');
	ball.preload();
	robot.preload();
}

function setup() {
	console.log("🚀 - Setup initialized - P5 is running");

	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER).noFill().frameRate(30);

	ball.setup();

	robot.setup();

	// walls (top right and bottom)
	walls = new Sprite([[0,0], [BG_WIDTH_PX,0], [BG_WIDTH_PX,BG_HEIGHT_PX], [0,BG_HEIGHT_PX]]);
	walls.collider = 'static';
	// left wall
	new Sprite([[0,0], [0,BG_HEIGHT_PX]]).collider = 'static';
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (key == 'r') {
		ball.reset();
		robot.reset();
	}
}

function draw() {
	clear();

	drawTime = millis();
	background(255);
	// simulation stuff
	image(bg, 0, 0);

	robot.onDraw(mouse, ball);

	drawSprites();
	// dev stuff
	drawDebugInfo();
}

function drawDebugInfo() {
	// set origin to after simulation bg
	translate(bg.width,0);
	// text style
	fill(0);
	textSize(12);

	// draw fps
	text("FPS: " + frameRate().toFixed(2), 10, 20);
	// draw time
	text("Draw time: " + (millis() - drawTime) + "ms", 10, 40);
	// draw mouse position
	text("Mouse: " + mouse.x + ", " + mouse.y, 10, 60);
	// draw player pos
	text("Player: " + robot.sprite.x.toFixed(2) + ", " + robot.sprite.y.toFixed(2), 10, 80);
	// draw ball pos
	text("Ball: " + ball.sprite.x.toFixed(2) + ", " + ball.sprite.y.toFixed(2), 10, 100);
	// draw last key pressed
	text("Last key pressed: " + key, 10, 120);
}
