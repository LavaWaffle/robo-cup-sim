let bg;

let ball = new Ball();

let blueRobot1 = new Robot("blue", BG_WIDTH_PX/2, 185);
let blueRobot2 = new Robot("blue", 185, 185);
let redRobot1 = new Robot("red", BG_WIDTH_PX/2, BG_HEIGHT_PX-185);
let redRobot2 = new Robot("red", 185, BG_HEIGHT_PX-185);


let walls = new Walls();

const blueGoal = new Goal('blue');
const orangeGoal = new Goal('orange');

let drawTime = 0;

let robotIndex = 0;

function preload() {
	bg = loadImage('./public/field.png');
	ball.preload();
	blueRobot1.preload();
	blueRobot2.preload();
	redRobot1.preload();
	redRobot2.preload();
}

function setup() {
	console.log("🚀 - Setup initialized - P5 is running");

	createCanvas(windowWidth, windowHeight)
	rectMode(CENTER).noFill().frameRate(30);

	ball.setup();

	blueRobot1.setup();
	blueRobot2.setup();
	redRobot1.setup();
	redRobot2.setup();

	walls.setup();
	
	blueGoal.setup(ball.sprite);
	orangeGoal.setup(ball.sprite);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (key == 'r') {
		ball.reset();
		Robot.robots.forEach(robot => {
			robot.reset();
		});
	}

	if (key == 'a') {
		const newIndex = robotIndex - 1;
		if (newIndex <= -1) {
			robotIndex = Robot.robots.length-1;
		} else {
			robotIndex = newIndex;
		}
	}

	if (key == 'd') {
		const newIndex = robotIndex + 1;
		if (newIndex >= Robot.robots.length) {
			robotIndex = 0;
		} else {
			robotIndex = newIndex;
		}
	}
}

let blueGoals = 0;
let orangeGoals = 0;

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

	blueRobot1.onDraw(robotIndex, mouse, ball);
	blueRobot2.onDraw(robotIndex, mouse, ball);
	redRobot1.onDraw(robotIndex, mouse, ball);
	redRobot2.onDraw(robotIndex, mouse, ball);

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
	text("Last key pressed: " + key, 10, 120);
	// draw robot index
	text("Robot index: " + robotIndex, 10, 140);
}
