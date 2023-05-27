let bg;
let ballImg;
let ball;


let drawTime = 0;
// field is 182cm (580px) by 243cm (775px)
// ratio1: 3.18681318681
// ratio2: 3.18930041152
const cmToPx = 3.18805679916;

function setup() {
	console.log("🚀 - Setup initialized - P5 is running");

	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER).noFill().frameRate(30);

	bg = loadImage('./public/field.png');
	ballImg = loadImage('./public/ball.png');
	ballImg.resize(7.4*cmToPx, 7.4*cmToPx);
	ball = new Sprite();
	ball.height = ballImg.height;
	ball.width = ballImg.width;
	ball.d = ballImg.height;
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	clear();

	drawTime = millis();
	background(255);
	// simulation stuff
	image(bg, 0, 0);
	ball.pos = {x: bg.width/2, y: bg.height/2};
	ball.draw();
	ballImg.resize(ball.width, ball.height)
	image(ballImg, ball.x-ball.width/2, ball.y-ball.height/2);

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
}
