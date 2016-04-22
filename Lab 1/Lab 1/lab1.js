function drawShapes(){
	// Initialize WebGL
	var mainCanvas = document.getElementById("gl-canvas");
	var gl = WebGLUtils.setupWebGL(mainCanvas);
	if(!gl){
		alert("WebGL is not available on this machine. Do you have the proper files?");
	}
	
	// Set initial canvas state
	gl.viewport(0, 0, 1024, 1024); // Set render size of viewport
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Transparent color -- RGBA
	gl.clear(gl.COLOR_BUFFER_BIT); // Clear the buffer!
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Set blending mode
	gl.enable(gl.BLEND); // Enable blending
	
	// Create points for Triangle
	var t1 = vec2(0.25,0.25);
	var t2 = vec2(0.75,0.25);
	var t3 = vec2(0.25,0.75);
	
	var triArray = [t1, t2, t3]; // Simple array of our vertex coords
	
	// Create points for Hexagon
	var h1 = vec2(-0.5,-0.15);
	var h2 = vec2(-0.25, -0.35);
	var h3 = vec2(-0.25,-0.60);
	var h4 = vec2(-0.5,-0.80);
	var h5 = vec2(-0.75,-0.60);
	var h6 = vec2(-0.75,-0.35)
	
	var hexArray = [h1, h2, h3, h4, h5, h6]; 
	
	// Create points for ellipse
	
	/* Using equation:
	 * x = a*cos(theta) + c
	 * y = b*sin(theta) + d
	 * where (c,d) is center of elipse, and a/b are x/y radii
	 */
	 
	var x,y;
	var theta;
	var xrad=0.30;
	var yrad=0.20;
	var xorig=0.5;
	var yorig=-0.5;
	
	
	var circArray = []; // Drawn in order: 1, 2, 3 ; 1, 3, 4. Or First, Curent, Next.
	
	var thetastart = 0;
	var thetaend = 2 * Math.PI;
	var n = 100;
	var thetastep = (thetaend-thetastart)/n;
	
	for (var i=0; i<n; i++){
		theta = thetastart+i * thetastep;
		x = (Math.cos(theta) * xrad) + xorig;
		y = (Math.sin(theta) * yrad) + yorig;
		circArray.push(vec2(x,y));
	}
	
	// Compile the points into a single array to push to the buffer
	var totArray = [];
	
	totArray = totArray.concat(triArray);
	totArray = totArray.concat(hexArray);
	totArray = totArray.concat(circArray);
	
	// Set up buffers and data
	var buffID = gl.createBuffer(); // Create a data buffer w/ id stored in buffID
	gl.bindBuffer( gl.ARRAY_BUFFER, buffID ); // Set buffer w/ buffID to currently used array buffer
	gl.bufferData( gl.ARRAY_BUFFER, flatten( totArray ), gl.STATIC_DRAW ); // Dump information from triArray into current array buffer
	
	// Initialize shaders
	var shader = initShaders( gl, "vertex-shader", "fragment-shader" ); // Construct a shader program from the shaders in our HTML
	gl.useProgram( shader ); // Use that program
	
	var position = gl.getAttribLocation( shader, "position" ); // Get position variable location from vertex shader
	gl.vertexAttribPointer( position, 2, gl.FLOAT, false, 0, 0 ); // Get information on the actual type of data to be loaded into variable
																  // In this case, 2D Floats
	gl.enableVertexAttribArray( position ); // Enable the variable for access
	
	fragColor = gl.getUniformLocation(shader, "currColor"); // Get address to currColor uniform
	
	// Draw!
	gl.uniform4f( fragColor, 0.0, 0.8, 0.65, 0.8 ); // Set fragColor to white
	gl.drawArrays( gl.TRIANGLES, 0, 3 ); // Take data from buffer index 0 to 2 (3 vertexes), draw using TRIANGLES specification
	gl.uniform4f( fragColor, 1.0, 1.0, 1.0, 1.0 ); // Set fragColor to white
	gl.drawArrays( gl.LINE_LOOP, 3, 6 ); // Start at index 3, take 4 vertexes (draw the square)
	gl.uniform4f( fragColor, 0.0, 0.6, 1.0, 0.6 ); // Set fragColor to white
	gl.drawArrays( gl.TRIANGLE_FAN, 9, n ); // Draw from end of square for as large as the ellipse is.
}