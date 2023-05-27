let bg;

let ballImg;
let ballSprite;

let playerImg;
let playerSprite;

let drawTime = 0;
// field is 182cm (580px) by 243cm (775px)
// ratio1: 3.18681318681
// ratio2: 3.18930041152
const cmToPx = 3.18805679916;
const bgWidthPx = 580;
const bgHeightPx = 775;
function setup() {
	console.log("🚀 - Setup initialized - P5 is running");

	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER).noFill().frameRate(30);

	bg = loadImage('./public/field.png');

	ballImg = loadImage('./public/ball.png');
	ballImg.resize(7.4*cmToPx, 7.4*cmToPx);
	ballSprite = new Sprite(bgWidthPx/2, bgHeightPx/2);
	ballSprite.height = ballImg.height;
	ballSprite.width = ballImg.width;
	ballSprite.d = ballImg.height;
	ballSprite.addImage(ballImg);

	playerImg = loadImage('./public/robot.png');	
	playerImg.resize(30*cmToPx, 30*cmToPx);
	playerSprite = new Sprite(bgWidthPx/2, bgHeightPx/2);
	playerSprite.height = playerImg.height;
	playerSprite.width = playerImg.width;
	playerSprite.d = playerImg.height;
	playerSprite.addAnimation(playerImg);
	playerSprite.rotation = radians(90);

	// walls
	// top
	new Sprite(0, 0, bgWidthPx*2, 1, 'static');
	// left
	new Sprite(0, 0, 1, bgHeightPx*2, 'static');
	// bottom
	new Sprite(0, bgHeightPx, bgWidthPx*2, 1, 'static');
	// right
	new Sprite(bgWidthPx, 0, 1, bgHeightPx*2, 'static');
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (key == 'r') {
		ballSprite.pos = {x: bgWidthPx/2, y: bgHeightPx/2};
		ballSprite.vel = {x: 0, y: 0};
		ballSprite.acc = {x: 0, y: 0};
		ballSprite.rotateTo(0, 15);
		playerSprite.pos = {x: bgWidthPx/2, y: bgHeightPx/2};
		playerSprite.vel = {x: 0, y: 0};
		playerSprite.acc = {x: 0, y: 0};
		playerSprite.rotateTo(0, 15);
	}
}

function draw() {
	clear();

	drawTime = millis();
	background(255);
	// simulation stuff
	image(bg, 0, 0);

	ballImg.resize(ballSprite.width, ballSprite.height)

	if (mouse.presses()) {
		playerSprite.moveTo(mouse, 8);
	}

	// rotate the player to face 90 degrees from the ball
	playerSprite.rotateTowards(ballSprite, 0.1, 90);

	playerImg.resize(playerSprite.width, playerSprite.height);

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
	text("Player: " + playerSprite.x.toFixed(2) + ", " + playerSprite.y.toFixed(2), 10, 80);
	// draw ball pos
	text("Ball: " + ballSprite.x.toFixed(2) + ", " + ballSprite.y.toFixed(2), 10, 100);
	// draw last key pressed
	text("Last key pressed: " + key, 10, 120);
}
