/* VARIABLES */
let walls, paddle, ball, bricks, hasStarted = false;
let enterButton;

/* PRELOAD LOADS FILES */
function preload() {
}

/* SETUP RUNS ONCE */
function setup() {
	createCanvas(500, 500);
	// Create "Enter" button
	enterButton = createButton('Enter');
	enterButton.position(width / 2 - 30, height / 2);
	enterButton.size(60, 30);
	enterButton.mousePressed(startGame);

	allSprites.collider = "k";
	allSprites.color = color("Lavender");

	// Create walls group at the top, left, and right of the screen
	walls = new Group();
	walls.w = 30;
	walls.h = 800;

	// Top wall
	let wallTop = new walls.Sprite(width / 2, -20);
	wallTop.rotation = 90;

	// Left and right walls
	new walls.Sprite(0, height / 2);
	new walls.Sprite(width, height / 2);

	// Create ball
	ball = new Sprite(width / 2, height - 200, 11, 'd');
	ball.bounciness = 1;
	ball.friction = 0;

	// Create paddle
	paddle = new Sprite(width / 2, height - 50, 100, 20, 'd');
	paddle.rotationLock = true;

	// Create bricks group
	bricks = new Group();
	bricks.tile = "=";
	bricks.w = 31;
	bricks.h = 11;

	// The notation in the next few lines is called an arrow function 
	ball.collide(bricks, (ball, brick) => {
		brick.remove();
	});
}

/* START GAME FUNCTION */
function startGame() {
	enterButton.hide();
	hasStarted = true;
}

/* DRAW LOOP REPEATS */
function draw() {
	background(247, 134, 131);

	if (hasStarted) {
		paddle.moveTowards(mouse.x, height - 50, 1);

		if (mouse.presses()) {
			// start or restart the game
			bricks.remove();

			new Tiles(
				[
					"======.======",
					"....==.....==",
					"....==.....==",
					"....==.....==",
					"....==.....==",
					"....==.....==",
					"....==.....==",
					"==..==.==..==",
					"======.======."
				],
				50,
				80,
				bricks.w + 3,
				bricks.h + 3
			);

			ball.x = width / 2;
			ball.y = height - 200;
			ball.direction = 90 + random(-10, 10);
			ball.speed = 8;
		}

		// When ball and paddle collide, move ball in a random direction
		if (ball.collides(paddle)) {
			ball.speed = 8;
			ball.direction = ball.direction + random(-10, 10);
		}

		// Check if the ball has reached the bottom of the screen
		if (ball.y > height) {
			hasStarted = false;
			enterButton.show();
		}

	} else {
		// Show start screen
		textSize(50);
		fill(255);
		textAlign(CENTER, CENTER);
		text('Attack!!', width / 2, height / 2 - 50);

		// Show "Game Over" if the game was started and then stopped
		if (ball.y > height) {
			enterButton.hide();
			textSize(32);
			fill("IndianRed");
			text('Game Over', width / 2, height / 2 + 50);
			allSprites.hide(); 
		}
	}
}
//Lets be honest first person shooter and adventure games are fun and all but they can get pretty tiring sometimes so for those tired times, long car rides and late nights, Id like to introduce my game Attack. Its a classic paddle game that involves a ball and paddle to bounce the ball off in specific directions in order to detroy all the tiles. And as you will see, these tiles conviently spell out two JJs for our favorite sponser Jhonson and Johnson so play this game today to be part of the Jhonson and Johnson fan club.