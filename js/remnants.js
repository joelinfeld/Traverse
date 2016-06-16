// ███╗   ███╗ ██████╗  ██████╗ ███╗   ██╗
// ████╗ ████║██╔═══██╗██╔═══██╗████╗  ██║
// ██╔████╔██║██║   ██║██║   ██║██╔██╗ ██║
// ██║╚██╔╝██║██║   ██║██║   ██║██║╚██╗██║
// ██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██║ ╚████║
// ╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
// function Moon(planetX, planetY, moonObj) {
// 	this.x = planetX;
// 	this.y = planetY;
// 	this.r = moonObj.r;
// 	this.dist = moonObj.dist;
// 	this.mass = moonObj.m;

// 	//how fast moon rotates
// 	this.thetaDelt = moonObj.spin;
// 	this.theta = 0;


// 	this.render = function() {

// 		push();

// 		this.theta += this.thetaDelt;

// 		var moonX = this.dist * cos(this.theta);
// 		var moonY = this.dist * sin(this.theta);

// 		translate(this.x, this.y);

// 		ellipse(moonX, moonY, this.r * 2, this.r * 2);

// 		pop();

// 	}

	// this.attract = function(ship) {
	// 	//create a force relative to distance from Planet to ship
	// 	var force = p5.Vector.sub(this.location, ship.location);

	// 	//create a variable for distance between Planet and ship
	// 	var distance = force.mag();
	// 	var check = force.mag();

	// 	//constrain distance so there is a limit to how strong/weak gravity force can be
	// 	distance = constrain(distance, 5, 50);

	// 	//normalize force vector to have unit vector in direction of the force
	// 	force.normalize();

	// 	//variable for strength based off eq for gravity
	// 	var strength = (G * this.mass * ship.mass) / (distance * distance);

	// 	if (check > 2.25 * this.mass) {
	// 		strength = 0;
	// 	}
	// 	//multiply force by strength for final force vector
	// 	force.mult(strength);

	// 	return force;
	// }
}












	// this.addMoon = function(moonObj) {
	// 	this.thetaDelt = moonObj.spin;
	// 	var moonR = moonObj.r;
	// 	var dist = moonObj.dist;
	// 	var moonM = moonObj.m;

	// 	//moon x and y determined by angle in rotation
	// 	var moonX = (this.location.x + dist + this.r) * cos(this.theta);
	// 	var moonY = (this.location.y + dist + this.r) * sin(this.theta);

		

	// 	// var moonLoc = createVector(this.location.x + this.mass * 2 * cos(theta), this.location.y + this.mass * 2 * sin(theta));
	// 	ellipse(moonX, moonY, moonR * 2, moonR * 2);
		
	// }













// 	//  █████╗ ███████╗████████╗███████╗██████╗  ██████╗ ██╗██████╗ 
// // ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔═══██╗██║██╔══██╗
// // ███████║███████╗   ██║   █████╗  ██████╔╝██║   ██║██║██║  ██║
// // ██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║██║  ██║
// // ██║  ██║███████║   ██║   ███████╗██║  ██║╚██████╔╝██║██████╔╝
// // ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═════╝ 

// function Asteroid() {
// 	// this.range = asteroidObj.range;
// 	// this.angle = asteroidObj.angle;
// 	// this.x = asteroidObj.x;
// 	// this.location = createVector((random(this.x - this.range, this.x + this.range) * cos(this.angle)), (height * sin(this.angle)));

// 	// this.render() {
// 	// 	ellipse(this.location.x, this.location.y, 10, 10);
		
// 	// }

// 	this.x = 3 * width/4;
// 	this.range = 50;

// 	this.astFrames = 0;

// 	this.astFrames -= 1;

// 	this.angle = -TAU/8;

// 	this.velocity = createVector(10, 0);

// 	this.velocity.rotate(this.angle);


// 	this.render = function() {

// 		if (this.astFrames = 0) {

// 			this.location = createVector(random(this.x - this.range, this.x + this.range), height);
// 			ellipse(this.location.x, this.location.y, 10, 10);

// 			this.location.add(this.velocity);
// 		}
// 	}



// }













		   //  for (var i = this.location.y + this.h; i >= this.location.y + this.h - this.power; i -= this.delta) {
		   //   	var inter = map(i, this.location.y + this.h, this.location.y, 0, 1);
			  //   var c = lerpColor(this.green, this.red, inter);
			  //   stroke(c);
			  //   line(this.location.x, i, this.location.x + this.w, i);
	  		// }
	  	// } else {

	  	// 	for (var i = this.location.y; i <= this.location.y + this.power; i -= this.delta) {

	  	// 	}
	  	// }


  


	  	}

  	// 	if (this.power == 0) {

			// this.delta *= -1;
	 	// }

		// if (this.power == 100) {

	 // 		this.delta = 0;
	 // 	}
	// }














	//method to display meter charge
	// this.charge = function() {

	// 	this.power += this.delta;
	// 	noFill();

	// 	for (var i; i <= 100; i++) {
	// 		var inter = map(this.location.y + this.h - i, this.location.y + this.h, this.location.y, 0, 1);
	// 		var c = lerpColor(this.green, this.red, inter);
	// 		stroke(c);
	// 		line(this.location.x, this.location.y + this.h - i, this.location.x + this.w, this.location.y + this.h - i);

	// 	}
	// }

	// 	push();

	// 	if (this.power <= 100) {

	// 		if (this.power > 5) {
	// 			fill(this.green);
	// 			rect(this.location.x, this.location.y + 75, this.w, 25);
	// 		}

	// 		if (this.power > 25) {
	// 			fill(this.yellow);
	// 			rect(this.location.x, this.location.y + 50, this.w, 25);
	// 		}

	// 		if (this.power > 50) {
 //        		fill(this.orange);
 //            	rect(this.location.x, this.location.y + 25, this.w, 25);
 //        	}

 //        	if (this.power > 75) {
 //        		fill(this.red);
 //        		rect(this.location.x, this.location.y, this.w, 25);
 //        	}
	// 	}

	// 	if (this.power == 0) {

	// 		this.delta *= -1;
	// 	}

	// 	if (this.power == 100) {

	// 		this.delta *= -1;
	// 	}
	// }












// noStroke();
		// fill(30, 30, 255);
		// ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2);
		// fill(60, 25, 255);
		// ellipse(this.location.x, this.location.y, this.r * 1.6, this.r * 1.6);
		// fill(90, 90, 255);
		// ellipse(this.location.x, this.location.y, this.r * 1.2, this.r * 1.2);
		// fill(120, 120, 255);
		// ellipse(this.location.x, this.location.y, this.r * .8, this.r * .8);
		// fill(150, 150, 255);
		// ellipse(this.location.x, this.location.y, this.r * .4, this.r * .4);
		// //iterate over all moons and render them



		// for (var i = 0; i < this.moons.length; i++) {
		// 	this.moons[i].render();
		// }
