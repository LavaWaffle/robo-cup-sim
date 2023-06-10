// Create new objects an images
let bg;

let ball = new Ball();

let blueRobot1 = new Robot("blue", BG_WIDTH_PX-185, 185);
let blueRobot2 = new Robot("blue", 185, 185);
let redRobot1 = new Robot("orange", BG_WIDTH_PX-185, BG_HEIGHT_PX-185);
let redRobot2 = new Robot("orange", 185, BG_HEIGHT_PX-185);


let walls = new Walls();

const blueGoal = new Goal('blue');
const orangeGoal = new Goal('orange');

let drawTime = 0;

let robotIndex = 0;

// Preload images
function preload() {
	bg = loadImage('./public/field.png');
	ball.preload();
	Robot.preloadAll();
}

// Setup sprites
function setup() {
	console.log("🚀 - Setup initialized - P5 is running");

	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER).noFill().frameRate(30);

	ball.setup();

	Robot.setupAll();

	ball.setupAfterRobots();

	walls.setup();
	
	blueGoal.setup();
	orangeGoal.setup();
}

// Resize canvas
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
	if (event.delta < 0) {
		Robot.robots[robotIndex].sprite.rotation += 45;
	} else if (event.delta > 0) {
		Robot.robots[robotIndex].sprite.rotation -= 45;
	}
}

function mousePressed(event) {
	if (mouseButton === RIGHT) {
		Robot.robots[robotIndex].sprite.rotation = 0;
	}
	if (mouseButton === LEFT) {
		if (Robot.robotDribbling === -1) {
			Robot.dribbleAll(robotIndex);
		} else {
			Robot.stopAnyDribbling();
		}
	}
}

// Handle keybinds
function keyPressed() {
	// R is reset
	if (key === 'r') {
		ball.reset();
		Robot.resetAll();
		Robot.stopAnyDribbling();
	}

	// A is change robot (left)
	if (key === 'a' || key === 'ArrowLeft') {
		const newIndex = robotIndex - 1;
		if (newIndex <= -1) {
			robotIndex = Robot.robots.length-1;
		} else {
			robotIndex = newIndex;
		}
	}

	// D is change robot (right)
	if (key === 'd' || key === 'ArrowRight') {
		const newIndex = robotIndex + 1;
		if (newIndex >= Robot.robots.length) {
			robotIndex = 0;
		} else {
			robotIndex = newIndex;
		}
	}

	// S is try to dribble the ball
	if (key === 's') {
		Robot.dribbleAll(robotIndex);
	}

	if (key === 'w') {
		Robot.stopAnyDribbling();
	}

	let speed = 0;
	let angle = Robot.robots[robotIndex].sprite.rotation;

	if (kb.pressing("j") && kb.pressing("i")) {
		// J and I is rotate robot
		speed = 0.5;
		angle = -135;
	} else if (kb.pressing("j") && kb.pressing("k")) {
		speed = 0.5;
		angle = 135;
	} else if (kb.pressing("l") && kb.pressing("i")) {
		speed = 0.5;
		angle = -45;
	} else if (kb.pressing("l") && kb.pressing("k")) {
		speed = 0.5;
		angle = 45;
	}  else if (kb.pressing("j")) {
		// J is rotate robot
		speed = 0.5;
		angle = -180;
	} else if (kb.pressing("l")) {
		speed = 0.5;
		angle = 0;
	} else if (kb.pressing("i")) {
		speed = 0.5;
		angle = -90;
	} else if (kb.pressing("k")) {
		speed = 0.5;
		angle = 90;
	}

	Robot.robots[robotIndex].drive(angle, speed);
}

// Store goals
let blueGoals = 0;
let orangeGoals = 0;

// Draw sprites and things
function draw() {
	clear();

	drawTime = millis();
	background(255);
	// background
	image(bg, 0, 0);
	// draw scores
	textSize(32);
	fill(0, 0, 255);
	text("Blue: " + blueGoals, 10, 40);
	fill(255, 165, 0);
	text("Orange: " + orangeGoals, 10, 80);

	Robot.onDrawAll(robotIndex);
	ball.onDraw();
	blueRobot2.drive(0, 0);

	// check if the ball is in the goal
	if (blueGoal.onDraw(ball)) {
		blueGoals++;
	}
	if (orangeGoal.onDraw(ball)) {
		orangeGoals++;
	}

	drawSprites();
	// dev stuff
	drawDebugInfo();
}

// Draw debug info
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
	text("Player: " + blueRobot1.sprite.x.toFixed(2) + ", " + blueRobot1.sprite.y.toFixed(2), 10, 80);
	// draw ball pos
	text("Ball: " + ball.sprite.x.toFixed(2) + ", " + ball.sprite.y.toFixed(2), 10, 100);
	// draw last key pressed
	text("Last key pressed: " + '"' + key + '"', 10, 120);
	// draw key code
	text("Key code: " + keyCode, 10, 160);
	// draw robot index
	text("Robot index: " + robotIndex, 10, 140);
}
