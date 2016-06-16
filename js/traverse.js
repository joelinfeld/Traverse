/*

ARTG 2260: Programming Basics
 Joel Infeld, joelinfeld@gmail.com
 Assignment_final: "Traverse"
 
 **************************
 CREDITS*******************
 **************************
 
 Splash music: Arrival - Daft Punk	
 Game music: Uncharted Worlds - Sam Hulick
 
Thanks to Daniel Shiffman for PVector gravity interactions outlined in "Nature of Code" materials
 
*/



//initiate stage array and stage index
var stages = [];
var currentStageIndex = 0;
//var a = {};

//globaly gravity coefficient
var G = 1;

//sound variables
var arrival;
var uncharted;
var crash;
var coin;

var alpha = 0;

var badgeCount = 0;
var exBadge;

var score = 0;
var scoreboard;

var splash = true;
var splashShip;

function preload() {
	uncharted = loadSound('assets/uncharted.wav');
	arrival = loadSound('assets/arrival.wav');
	crash = loadSound('assets/crash.wav');
	coin = loadSound('assets/coin.wav');
}

function setup() {
	createCanvas(1280, 800);

	scoreboard = new Score();
	splashShip = new Ship(width/2, 300);

	//set audio volumes
	arrival.setVolume(.5);
	uncharted.setVolume(.2);
	crash.setVolume(.3);
	coin.setVolume(.1);
	

	//create or load in stage JSON, push to stages[]
	var stageConfigs = [{
		//intro stage and depot
		title: "All Systems Go!",
		points: 100,
		shipX: 75,
		shipY: height/2,
		depotX: width/2,
		depotY: height/2,
		planets: [{}],
		badge: {
			x: width/3,
			y: height/2
		}
	}, {
		//one planet, grav rebound
		title: "On the Rebound",
		points: 200,
		shipX: 75,
		shipY: height/2,
		depotX: width - 75,
		depotY: height/2,
		planets: [{
			x: width/2,
			y: height/2,
			m: 300,
			r: 125,
		}],
		badge: {
			x: width/2,
			y: height/2 + 160
		}
	}, {
		//two planet grav rebound from top left to bottom right.
		title: "When one just wont do",
		points: 300,
		shipX: 75,
		shipY: 150,
		depotX: width - 75,
		depotY: height - 100,
		planets : [{
			x: width/3,
			y: 225,
			m: 200,
			r: 75,
		}, {
			x: width - width/3.5,
			y: height - 350,
			m: 250,
			r: 75,
		}],
		badge: {
			x:(width - width/3.5) + 95,
			y:(height - 350) - 95
		}
	},  {
		//figure 8
		title: "Figure 8",
		points: 400,
		shipX: 75,
		shipY: height/2,
		depotX: width - 75,
		depotY: height/2,
		planets: [{
			x: width/3 - 35,
			y: height/2,
			m: 250,
			r: 75,
		}, {
			x: (2 * width/3) + 35,
			y: height/2,
			m:250,
			r:75,
		}],
		badge: {
			x:(width/3 - 35) + 250,
			y: height/2
		}
	}, {
		//super HIGH MASS BADBOIIIIEEE
		title: "A wild black hole has appeared!",
		points: 500,
		shipX: 75,
		shipY: height/2 - 75,
		depotX: width - 75,
		depotY: height/2,
		planets: [{
			x: width/2,
			y: height - 135,
			m: 700,
			r: 75,
		}],
		badge: {
			x: width/2,
			y:(height - 555)
		}
	}, {
		//high arc to get around debris field/nebula/whatever it ends up being
		title: "What goes up must come down... well, sorta",
		points: 600,
		shipX: 75,
		shipY: 4 * height/5 + 25,
		depotX: width - 75,
		depotY: 4 * height/5 + 25,
		planets: [{
			x: width/2,
			y: height/3 + 50,
			m: 400,
			r: 100,
		}],
		badge: {
			x:width/2,
			y:(height/3 - 160)
		}
	}];



	for (var i = 0; i < stageConfigs.length; i++) {
		var stageObj = stageConfigs[i];
		var S = new Stage(stageObj);
		stages.push(S);
	}



}



function draw() {
	//set background and render stages based on currentStageIndex
	background(0);
	console.log(stages.length);		

	//render splash screen at beginning
	if (splash == true) {

		if (arrival.isPlaying() == false) {
			arrival.loop();
		}

		push();
	 	fill(255, alpha);

	 	textFont('Audiowide');
		textSize(180);
		textAlign(CENTER, BOTTOM);
		text("TRAVERSE", width/2, height/2);

		textSize(30);
		text("Press Enter", width/2, (4 * height/5));

		 alpha += .5;

		 pop();

		 splashShip.render;

		 if (keyIsPressed && keyCode === ENTER) {
		 	splash = false;
		 }

		 //render stages according to stage index
	} else if (currentStageIndex < stages.length) {
		arrival.stop();
		if (uncharted.isPlaying() == false) {
			uncharted.loop();
		}

		stages[currentStageIndex].render();
		scoreboard.render();
		
		//when out of stages render game end screen
	} else {

		push();
		fill(255);

		textFont('Audiowide');
		textSize(180);
		textAlign(CENTER, BOTTOM);
		text("GAME OVER", width/2, height/2);

		textSize(40);

		if (badgeCount == 0) {
			badgeCount = 1;
		}
		
		text("Final Score: " + badgeCount * score, width/2, (3 * height/5));
	}
}



// ███████╗██╗  ██╗██╗██████╗ 
// ██╔════╝██║  ██║██║██╔══██╗
// ███████╗███████║██║██████╔╝
// ╚════██║██╔══██║██║██╔═══╝ 
// ███████║██║  ██║██║██║     
// ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     
                           
function Ship(shipX, shipY) {
	//location, initial location for reset, initial velocity
	this.location = createVector(shipX, shipY);

	
	//hitpoint vectors and initial locations for better collision tracking
	this.hitPt1 = createVector(shipX, shipY -5);
	this.hitPt2 = createVector(shipX - 15, shipY + 17);
	this.hitPt3 = createVector(shipX + 15, shipY + 17);

	this.initHitPt1 = createVector(shipX, shipY -5);
	this.initHitPt2 = createVector(shipX - 15, shipY + 17);
	this.initHitPt3 = createVector(shipX + 15, shipY + 17);
	this.initLoc = createVector(shipX, shipY);

	this.velocity = createVector(0, -10);
	
	//initialize an acceleration vector, set mass of ship, initialize angle
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.angle = 0;

    //initialize required booleans and explosion frames for desired explosion duration if ship hits something
    this.exploded = false;
    this.launched = false;
    this.landed = false;
    this.explosionFrames = 60;

    //render ship
    this.render = function() {
    	//if ship has landed on depot, do not render anything.
    	if(this.landed === true) {

    	} //if ship has exploded render an explosion instead of the ship body
    	else if (this.exploded === true) {
    		var blastCount = random(3, 7);
		 	var r = [];

			for (var i = 0; i < blastCount; i++) {
				r.push(random(5, 18));
				fill(255, random(255), 0, 255);
				ellipse(this.location.x + random(-10, 10), this.location.y + random(-10,10), r[i] * 2, r[i] * 2);
			}

			//count down explosion frames so explosion lasts 2 seconds and reset ship
			this.explosionFrames -= 1;

			if (this.explosionFrames == 0) {
				this.reset();
				stages[currentStageIndex].badge.reset();
			}	

		} //otherwise render ship at specified angle and location
		else {
			
			//set angle of ship to follow direction of ships velocity
	    	if (keyIsPressed === true && this.launched === false) {
		
				if (keyCode === LEFT_ARROW) {
					this.velocity.rotate(-TAU/120);
			
				} else if (keyCode === RIGHT_ARROW) {
					this.velocity.rotate(TAU/120);
				}
			}
	    	
	    	this.angle = this.velocity.heading() + TAU/4;
	        
	    	push();

	    	//render ship according to angle and location
	    	translate(this.location.x, this.location.y);
	    	rotate(this.angle);

	    	noStroke();

	    	fill(100);
	    	beginShape();
	    	vertex(0, -17);
	    	vertex(-17, 17);
	    	vertex(-8, 24);
	    	vertex(8, 24);
	    	vertex(17, 17);
	    	endShape();

	    	stroke(0, 0, 255);
	   		
	   		//left decals
	    	line(-2, -13, -2, -4);
	    	line(-2, -4, -9, 10);
	    	line(-9, 10, -9, 15);
	    	line(-9, 15, -6, 23);

	    	//right decals
	    	line(1, -13, 1, -4);
	    	line(1, -4, 8, 10);
	    	line(8, 10, 8, 15);
	    	line(8, 15, 5, 23);

	    	// stroke(255);
	    	// point(this.hitPt1.x, this.hitPt1.y);
	    	// point(this.hitPt2.x, this.hitPt2.y);
	    	// point(this.hitPt3.x, this.hitPt3.y);
	    	//triangle(0, -17, -15, 17, 15, 17);
	    	//rect(-5, 15, 10, 5);
	    
	    	pop();
    	}
	}
		

    //method to apply force vector to ship (from Planet)
    this.applyForce = function (force) {
    	if (this.exploded === false && this.launched === true){
    	var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
		}
    }

    this.update = function() {
    	if (this.exploded === false && this.launched === true) {
	    	this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			this.hitPt1.add(this.velocity);
			this.hitPt2.add(this.velocity);
			this.hitPt3.add(this.velocity);
			this.acceleration.mult(0);

			// //Added from JL, seamless bounding
			// if (this.location.x > 1.05 * width) {
			// 	this.location.x = -0.05 * width;
			// } else if (this.location.x < -0.05 * width) {
			// 	this.location.x = 1.05 * width;
			// }

			// if (this.location.y > 1.05 * height) {
			// 	this.location.y = -0.05 * height;
			// } else if (this.location.y < -0.05 * height) {
			// 	this.location.y = 1.05 * height;
			// }	
		}

    }

    //method to blow that motha UP
    this.explode = function() {
    	if (this.exploded === false) {
    		crash.play();
    		this.exploded = true;
    	}       
    }

    //method to reset ship
    this.reset = function() {
		this.location = createVector(this.initLoc.x, this.initLoc.y);
		this.hitPt1 = createVector(this.initHitPt1.x, this.initHitPt1.y);
		this.hitPt2 = createVector(this.initHitPt2.x, this.initHitPt2.y);
		this.hitPt3 = createVector(this.initHitPt3.x, this.initHitPt3.y);
		this.velocity.normalize();
		this.exploded = false;
		this.launched = false;
		this.landed = false;
		this.explosionFrames = 60;
		
    }

    this.launch = function(metercharge) { 
    	if (this.launched === false) {
    		this.velocity.setMag(metercharge/5);
    		this.launched = true;
    	}
    }

    this.land = function() {
    	this.landed = true;
    }
}

// ██████╗ ██╗      █████╗ ███╗   ██╗███████╗████████╗
// ██╔══██╗██║     ██╔══██╗████╗  ██║██╔════╝╚══██╔══╝
// ██████╔╝██║     ███████║██╔██╗ ██║█████╗     ██║   
// ██╔═══╝ ██║     ██╔══██║██║╚██╗██║██╔══╝     ██║   
// ██║     ███████╗██║  ██║██║ ╚████║███████╗   ██║   
// ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝ 

//build Planet object
// function Planet(planX, planY, planMass, planR, moonArray) {
function Planet(planetObj) {
	this.location = createVector(planetObj.x, planetObj.y);
	this.mass = planetObj.m;
	this.r = planetObj.r;
	this.theta = 0;
	this.thetaDelt = 0;
	// this.moons = [];

	//planet colors
	this.red = color(255,0,0);
	this.blue = color(0, 0, 255);
	this.redWhite = color(255, 150, 150, 255);
	this.blueWhite = color(150, 150, 255, 255);

		//color based on planet mass
		var inter = map(this.mass, 200, 500, 0, 1);
     	//outer color
	    this.c1 = lerpColor(this.blue, this.red, inter);
	    //inner color
	    this.c2 = lerpColor(this.blueWhite, this.redWhite, inter);
	    

	// variables for lerpColor
	this.c1;
	this.c2;


	this.attract = function(ship) {
		//create a force relative to distance from Planet to ship
		var force = p5.Vector.sub(this.location, ship.location);

		//create a variable for distance between Planet and ship
		var distance = force.mag();
		var check = force.mag();

		//constrain distance so there is a limit to how strong/weak gravity force can be
		distance = constrain(distance, 5, 50);

		//normalize force vector to have unit vector in direction of the force
		force.normalize();

		//variable for strength based off eq for gravity
		var strength = (G * this.mass * ship.mass) / (distance * distance);

		if (check > this.mass) {
			strength = 0;
		}
		//multiply force by strength for final force vector
		force.mult(strength);

		return force;
	}

	//method to render Planet
	this.render = function() {

		//render planet based on given radius
		var maxR = this.r * 2

		if (this.mass > 600) {
			push();
			//halo
			stroke(0);
			noFill();
			strokeWeight(2);
			ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
			strokeWeight(1);
			stroke(255);
			ellipse(this.location.x, this.location.y, (this.mass * 2) + 3, (this.mass * 2) + 3);
			ellipse(this.location.x, this.location.y, (this.mass * 2) - 3, (this.mass * 2) - 3);

			
			fill(0);
			stroke(255);
			ellipse(this.location.x, this.location.y, maxR, maxR);
			pop();

		} else {
	  		push();
			//render gravity halo based on mass of planet
			stroke(this.c1);
			noFill();
			ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
			pop();

		
			push();
			fill(this.c1);
			ellipse(this.location.x, this.location.y, maxR, maxR);
			pop();

		   for (var i = 0; i <= maxR; i += 5) {
		     	push();
		     	noFill();
		     	var inter1 = map(i, 0, maxR, 0, 1);
			    var c = lerpColor(this.c2, this.c1, inter1);
			    stroke(c);
			    strokeWeight(5);
			    ellipse(this.location.x, this.location.y, i, i);
			    pop();
	  		}
		}
	}
}








// ██████╗ ███████╗██████╗  ██████╗ ████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝
// ██║  ██║█████╗  ██████╔╝██║   ██║   ██║   
// ██║  ██║██╔══╝  ██╔═══╝ ██║   ██║   ██║   
// ██████╔╝███████╗██║     ╚██████╔╝   ██║   
// ╚═════╝ ╚══════╝╚═╝      ╚═════╝    ╚═╝  
function Depot(depotX, depotY) {

	this.location = createVector(depotX, depotY);
	this.r1 = 50;
	this.r2 = this.r1/2;
	this.theta1 = 0;
	this.theta2 = 0;
	this.theta1D = .005;
	this.theta2D = -.007;

	this.render = function() {

		push();

		translate(this.location.x, this.location.y);
		rotate(this.theta2)

		this.theta2 += this.theta2D;

		noFill();
		strokeWeight(5);
		stroke(100);
		ellipse(0, 0, this.r2 * 2, this.r2 * 2);
		line(0, -this.r2, 0, this.r2);
		line(-this.r2, 0, this.r2, 0);

		pop();

		push();

		translate(this.location.x, this.location.y);
		rotate(this.theta1)

		this.theta1 += this.theta1D;

		noFill();
		strokeWeight(8);
		stroke(191);
		ellipse(0, 0, this.r1 * 2, this.r1 * 2);
		line(0, -this.r1, 0, this.r1);
		line(-this.r1, 0, this.r1, 0);

		pop();


	}

	this.orbit = function() {}
}

// ███╗   ███╗███████╗████████╗███████╗██████╗ 
// ████╗ ████║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
// ██╔████╔██║█████╗     ██║   █████╗  ██████╔╝
// ██║╚██╔╝██║██╔══╝     ██║   ██╔══╝  ██╔══██╗
// ██║ ╚═╝ ██║███████╗   ██║   ███████╗██║  ██║

function Meter(xPos, yPos) {

	this.location = createVector(xPos - 40, yPos - 140);
	this.w = 20;
	this.h = 100;
	this.delta = 1;

	this.red = color(255, 0, 0);
 	this.orange = color(255, 151, 54);
  	this.yellow = color(255, 255, 0);
  	this.green = color(0, 255, 0);

  	this.power = 0;

  	this.decharge = false;

  	this.charge = function() {

  		this.power += this.delta;

  		if (this.power == 100 || this.power == 0) {
  			this.delta *= -1;
  		}

  		noFill();

  		// if (this.power = 100) {
  		// 	this.decharge = true;
  		// 	this.delta *= -1;
  		// }

		    for (var i = this.location.y + this.h - 1; i >= this.location.y + 1; i--) {
		     	push();
		     	var inter = map(i, this.location.y + this.h, this.location.y, 0, 1);
			    var c = lerpColor(this.green, this.red, inter);
			    stroke(c);
			    line(this.location.x + 1, i, this.location.x + this.w - 1, i);
			    pop();
	  		}

	  		for (var i = this.location.y + 1; i <= this.location.y + this.h - this.power - 1; i++) {
	  			push();
	  			stroke(0);
	  			line(this.location.x + 1, i, this.location.x + this.w - 1, i);
	  			pop();
	  		}
	  	}



  	//method to render empty meter
	this.render = function() {
		push();

		fill(0);
		stroke(191);

		rect(this.location.x, this.location.y, this.w, this.h);

		pop();
	}

	

	this.reset = function() {
		this.power = 0;

		//makes sure delta doesn't go negative forevahhh
		if (this.delta == -1) {
			this.delta *= -1;
		}
	}
	
}


// ███████╗████████╗ █████╗ ██████╗ 
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
// ███████╗   ██║   ███████║██████╔╝
// ╚════██║   ██║   ██╔══██║██╔══██╗
// ███████║   ██║   ██║  ██║██║  ██║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
function Star() {

	this.loc = createVector(random(width), random(height));
	this.r = random(.5, 2.5);
	this.alpha = 0;
	this.alphaRate = random(.25, 5);

	this.render = function() {

		push();

		noStroke();
		fill(255, this.alpha);
		ellipse(this.loc.x, this.loc.y, this.r, this.r);

		// this.alpha += this.alphaRate;

		// //why wont you twinkle?!?!?!?!?!?!?!?
		// if (this.alpha == 254) {
		// 	this.alphaRate *= -1;
		// }

		pop();
	}
}

// ██████╗  █████╗ ██████╗  ██████╗ ███████╗
// ██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔════╝
// ██████╔╝███████║██║  ██║██║  ███╗█████╗  
// ██╔══██╗██╔══██║██║  ██║██║   ██║██╔══╝  
// ██████╔╝██║  ██║██████╔╝╚██████╔╝███████╗
// ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝

//create collectible badges
function Badge(badgeObj) {
	this.location = createVector(badgeObj.x, badgeObj.y);
	this.cap = false;
	this.once = true;


	this.render = function() {
		if (this.cap == false) {

		push();
		fill(255,215,0);
		ellipse(this.location.x, this.location.y, 32, 32);
		pop();
		}
	}

	this.score = function() {
		if (this.once == true) {
			badgeCount++;
			coin.play();
			this.cap = true;
			this.once = false;

		}
	}

	this.reset = function() {
		if (this.once == false) {
			badgeCount--;
		}
		this.cap = false;
		this.once = true;
	}



}

// ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
// ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
// ███████╗██║     ██║   ██║██████╔╝█████╗  
// ╚════██║██║     ██║   ██║██╔══██╗██╔══╝  
// ███████║╚██████╗╚██████╔╝██║  ██║███████╗
// ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

function Score() {

	this.render = function() {
		//render badge count
		textFont('Audiowide');
		
		fill(255,215,0);
		ellipse((3 * width/4) - 85, 18, 32, 32);

		push();	
		fill(255);
		textSize(32);
		textAlign(LEFT, TOP);
		text("x " + badgeCount, (3 * width/4) - 60, 0);
		text("score: " + score, (3 * width/4) + 40, 0);
		pop();
	}

}

// ██████╗ ███████╗██████╗ ██████╗ ██╗███████╗
// ██╔══██╗██╔════╝██╔══██╗██╔══██╗██║██╔════╝
// ██║  ██║█████╗  ██████╔╝██████╔╝██║███████╗
// ██║  ██║██╔══╝  ██╔══██╗██╔══██╗██║╚════██║
// ██████╔╝███████╗██████╔╝██║  ██║██║███████║
// ╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝

function Debris(debrisObj) {


}

// ███████╗████████╗ █████╗  ██████╗ ███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝
// ███████╗   ██║   ███████║██║  ███╗█████╗  
// ╚════██║   ██║   ██╔══██║██║   ██║██╔══╝  
// ███████║   ██║   ██║  ██║╚██████╔╝███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
// function Stage(shipX, shipY, depotX, depotY, planetArray) {
function Stage(stageObj) {

	//timelag variables for explosion length
	this.delt = 1; 
	this.sec;

	this.once = true;

	this.points = stageObj.points;

	//object inititation
	this.ship = new Ship(stageObj.shipX, stageObj.shipY);

    this.planets = [];
    
    this.badge = new Badge(stageObj.badge);

    for (var i = 0; i < stageObj.planets.length; i++) {
    	var planetObj = stageObj.planets[i];
    	var P = new Planet(planetObj);
    	this.planets.push(P);

    }


    //create depot and meter for stage
	this.depot = new Depot(stageObj.depotX, stageObj.depotY);
	this.meter = new Meter(this.ship.location.x, this.ship.location.y);
	
	//create stars for background
	this.starCount = 1000;
	this.stars = [];

	for (var i = 0; i < this.starCount; i++) {
		this.stars.push(new Star());
	}

	//render everything
	this.render = function() {
		//render stars
		for (var i = 0; i < this.stars.length; i++) {
 			this.stars[i].render();
 			this.stars[i].alpha += this.stars[i].alphaRate;

 		}


 		//apply Planet forces to ship and render planets
 		for (var i = 0; i < this.planets.length; i++) {
 			var force = this.planets[i].attract(this.ship);

 			this.ship.applyForce(force);
 			this.planets[i].render();

 			 if ((dist(this.ship.location.x, this.ship.location.y, this.planets[i].location.x, this.planets[i].location.y) < this.planets[i].r) ||
 			 	(dist(this.ship.hitPt1.x, this.ship.hitPt1.y,this.planets[i].location.x, this.planets[i].location.y) <= this.planets[i].r) ||
 			 	(dist(this.ship.hitPt2.x, this.ship.hitPt2.y,this.planets[i].location.x, this.planets[i].location.y) <= this.planets[i].r) ||
				(dist(this.ship.hitPt3.x, this.ship.hitPt3.y,this.planets[i].location.x, this.planets[i].location.y) <= this.planets[i].r)) {


	     	//if ship collides with anything except depot, trigger explosion
	     	// if 
	     	 
	        	this.ship.explode();
	        	this.meter.reset();

	        	if (this.once == true && this.points > 100) {
	        			this.points -= 100;
	        			this.once = false;
	        		}
	        	
	      	}

	      }



      	//if aint nothin happened, render ship
 		this.ship.render();
 		this.ship.update();

      	//render depot
      	this.depot.render();

      	//render badge
      	this.badge.render();

      	if ((dist(this.ship.location.x, this.ship.location.y, this.badge.location.x, this.badge.location.y) < 16) ||
      		(dist(this.ship.hitPt1.x, this.ship.hitPt1.y, this.badge.location.x, this.badge.location.y) <= 16) ||
 			(dist(this.ship.hitPt2.x, this.ship.hitPt2.y, this.badge.location.x, this.badge.location.y) <= 16) ||
			(dist(this.ship.hitPt3.x, this.ship.hitPt3.y, this.badge.location.x, this.badge.location.y) <= 16)) {

      		this.badge.score();
      	}

      	//change level if depot reached
    	if ((dist(this.ship.location.x, this.ship.location.y, this.depot.location.x, this.depot.location.y) < this.depot.r1) ||
    		(dist(this.ship.hitPt1.x, this.ship.hitPt1.y, this.depot.location.x, this.depot.location.y) <= this.depot.r1) ||
 			(dist(this.ship.hitPt2.x, this.ship.hitPt2.y, this.depot.location.x, this.depot.location.y) <= this.depot.r1) ||
			(dist(this.ship.hitPt3.x, this.ship.hitPt3.y, this.depot.location.x, this.depot.location.y) <= this.depot.r1)) {

      		this.ship.land();
      		score += this.points;

      		
      		currentStageIndex++;
      		
      		
    	}

    	//render power meter
    	this.meter.render();

    	//key press controls
    	if (keyIsPressed === true) {
	
			if (key === ' ') {
				this.meter.charge(); 
			} 

			if (key == 'r' || key == 'R') {
				this.ship.reset();
				this.meter.reset();
				this.badge.reset();

				if (this.once == true && this.points > 100) {
	        			this.points -= 100;
	        			this.once = false;
	        		}
				//this.badge.reset();
			}

		}

		//render stage title
		push();
		textFont('Audiowide');
		fill(255);
		textSize(25);
		textAlign(LEFT, TOP);
		text(stageObj.title, 0, 5);
		pop();
	}

	this.launch = function() {
		//launch ship, once to reset point decrease
		this.once = true;
		this.ship.launch(this.meter.power);	
	}
}

		

function keyReleased() {

	if (key == ' ') {
		stages[currentStageIndex].launch();
	}
}



