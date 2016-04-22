var theta; // Current degree of rotation
var thetaLoc; // Location of theta uniform from vert shader
var mouseCoordsLoc; // Location of mouseCoords uniform from vert shader
var x, y; // Internal x/y coords for offset modification
var shader; // Our shader program
var gl; // WebGL context
var rotating; // Whether or not shape should be rotating
var moving; // Whether or not shape should be sliding about
var speed; // Current speed modifier for motion
var direction; // Current direction shape is moving in

function keyPressed(event){
	switch(event.code){
		case "KeyW":
			direction = 0;
			break;
			
		case "KeyA":
			direction = 1;
			break;
			
		case "KeyS":
			direction = 2;
			break;
			
		case "KeyD":
			direction = 3;
			break;
	}
}

function render(){
	// Draw!
	gl.clear(gl.COLOR_BUFFER_BIT); // Clear the buffer!
	if (rotating){
			theta = theta + (0.01 * speed);
			console.log(theta);
			gl.uniform1f( thetaLoc, theta )
	}
	if (moving){
		switch(direction){
		case 0:
			y = y + (.005 * speed);
			break;
			
		case 1:
			x = x - (.005 * speed);
			break;
			
		case 2:
			y = y - (.005 * speed);
			break;
			
		case 3:
			x = x + (.005 * speed);
			break;
		}
	}
	
	gl.uniform2f( mouseCoordsLoc, x, y ); // Update mousecoords offset
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 ); // Start at index 3, take 4 vertexes (draw the square)
	

	requestAnimFrame(render); // Provide next frame upon browser's request. Will cause screen tearing
	                          // If desktop environment doesn't provide for refresh rate/vsync
							  // Uses browser's framebuffer for double buffering
}

function jumpShape(event){
	
	var canvasx = event.clientX;
	var canvasy = event.clientY;
	
	x = 2 * canvasx / 1024.0 - 1; // where 1024 is the size of the canvas
	y = -( 2 * canvasy / 1024.0 - 1);
	gl.uniform2f( mouseCoordsLoc, x, y );
	
}

function speedUp(){
	speed += .5;
}

function speedDown(){
	speed -= .5;
}

function startRot(){
	rotating = true;
}

function stopRot(){
	rotating = false;
}

function startMove(){
	moving = true;
}

function stopMove(){
	moving = false;
}

function drawShapes(){
	// Initialize WebGL
	var mainCanvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(mainCanvas);
	if(!gl){
		alert("WebGL is not available on this machine. Do you have the proper files?");
	}
	
	// Set initial canvas state
	gl.viewport(0, 0, 1024, 1024); // Set render size of viewport
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Transparent color -- RGBA
	gl.clear(gl.COLOR_BUFFER_BIT); // Clear the buffer!
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Set blending mode
	gl.enable(gl.BLEND); // Enable blending
	
	rotating = true;
	moving = true;
	theta = 0.0; // Set initial rotation angle to 0
	speed = 1; // Set initial speed modifier to 100%
	x = 0.0;
	y = 0.0;
	direction = 3;
	
	
	// Create points for Hexagon
	var h1 = vec2(0.0, 0.40);
	var h2 = vec2(-0.35, 0.15);
	var h3 = vec2(-0.35,-0.15);
	var h4 = vec2(0.0,-0.40);
	var h5 = vec2(0.35,-0.15);
	var h6 = vec2(0.35,0.15)
	
	var totArray = [h1, h2, h3, h4, h5, h6]; 

	
	// Set up buffers and data
	var buffID = gl.createBuffer(); // Create a data buffer w/ id stored in buffID
	gl.bindBuffer( gl.ARRAY_BUFFER, buffID ); // Set buffer w/ buffID to currently used array buffer
	gl.bufferData( gl.ARRAY_BUFFER, flatten( totArray ), gl.STATIC_DRAW ); // Dump information from triArray into current array buffer
	
	// Initialize shaders
	shader = initShaders( gl, "vertex-shader", "fragment-shader" ); // Construct a shader program from the shaders in our HTML
	gl.useProgram( shader ); // Use that program
	
	var position = gl.getAttribLocation( shader, "position" ); // Get position variable location from vertex shader
	gl.vertexAttribPointer( position, 2, gl.FLOAT, false, 0, 0 ); // Get information on the actual type of data to be loaded into variable
																  // In this case, 2D Floats
	gl.enableVertexAttribArray( position ); // Enable the variable for access
	
	fragColor = gl.getUniformLocation(shader, "currColor"); // Get address to currColor uniform
	thetaLoc = gl.getUniformLocation(shader, "theta"); // Get address to theta in vertex shader
	mouseCoordsLoc = gl.getUniformLocation(shader, "mouseCoords"); // Ditto
	
	gl.uniform4f( fragColor, 1.0, 1.0, 1.0, 1.0 ); // Set fragColor to white
	gl.uniform2f( mouseCoordsLoc, 0.0, 0.0 ); // Set initial mouse coordinates to 0,0
	
	//setInterval( render, 16 ); // lock update interval to 60hz
	// Note: Independent of browser execution, so may cause issues
	
	render();
	
}