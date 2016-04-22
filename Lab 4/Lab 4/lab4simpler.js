// Name: Adam Kimball

var gl;
var numVertices;
var numTriangles;
var pro = 1;
var specular = true;
var point = 1.0;
var spot = 1.0;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    var myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    
    numVertices = 2440;
    numTriangles = 4871;
    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
    // Insert your code here
	
	/* Camera */
	
	var e = [-14, 10, -5]; // Eye
	var a = [0, 0, 0]; // Point to look at
	var vu = [0, 1, 0]; // Up vector
	
	// Create Model View Matrix
	
    var Mv = createModelViewMatrix(e, a, vu);
	
	
	var MvPos = gl.getUniformLocation(myShaderProgram, "Mv");
	gl.uniformMatrix4fv(MvPos, false, flatten(Mv));
	
	// Create perspective matrix
	
	// Perspective
	if (pro == 1){
		var P = createPerspectiveMatrixWithFOV( 50, 1, -67.9, 51 );
		//var P = createPerspectiveMatrix( -60, 60, -60, 60, -60, 60 );
	}
	
	// Orthographic
	if (pro == 2){
		var P = createOrthographicMatrix(-60, 60, -60, 60, -60, 60)
	}
	
	
	var PPos = gl.getUniformLocation(myShaderProgram, "P");
	gl.uniformMatrix4fv(PPos, false, flatten(P));
	
	
    /* Lighting */
	
	var vertexNormals = calculateNormals(vertices, indexList);
	
	var vertexNormBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
	
	
	var normPosition = gl.getAttribLocation(myShaderProgram, "vn");
    gl.vertexAttribPointer( normPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( normPosition );
	
	// Point light calculation
	var p0Pos = gl.getUniformLocation(myShaderProgram, "p0");
	var kaPos = gl.getUniformLocation(myShaderProgram, "ka");
	var kdPos = gl.getUniformLocation(myShaderProgram, "kd");
	var ksPos = gl.getUniformLocation(myShaderProgram, "ks");
	var IaPos = gl.getUniformLocation(myShaderProgram, "Ia");
	var IdPos = gl.getUniformLocation(myShaderProgram, "Id");
	var IsPos = gl.getUniformLocation(myShaderProgram, "Is");
	var alphaPos = gl.getUniformLocation(myShaderProgram, "alpha");
	var pointPos = gl.getUniformLocation(myShaderProgram, "point");
	
	
	var p0 = [20, -30, 40];
	var ka = [.3, .3, .3]; // ambient coefficient
	var kd = [.2, .2, .2]; // diffuse
	if (specular == true)
		var ks = [4.9, 4.9, 4.9];
	else
		var ks = [0.0, 0.0, 0.0];
	
	var Ia = [.2, .1, .1];
	var Id = [.8, .8, .8];
	var Is = [.9, .9, .9];
	
	var alpha = 10.0;
	
	gl.uniform3fv(p0Pos, p0);
	gl.uniform3fv(kaPos, ka);
	gl.uniform3fv(kdPos, kd);
	gl.uniform3fv(ksPos, ks);
	gl.uniform3fv(IaPos, Ia);
	gl.uniform3fv(IdPos, Id);
	gl.uniform3fv(IsPos, Is);
	gl.uniform1f(alphaPos, alpha);
	gl.uniform1f(pointPos, point);
	
	// Spot light calculation
	
	var p1Pos = gl.getUniformLocation(myShaderProgram, "p1");
	var ka1Pos = gl.getUniformLocation(myShaderProgram, "ka1");
	var kd1Pos = gl.getUniformLocation(myShaderProgram, "kd1");
	var ks1Pos = gl.getUniformLocation(myShaderProgram, "ks1");
	var Ia1Pos = gl.getUniformLocation(myShaderProgram, "Ia1");
	var Id1Pos = gl.getUniformLocation(myShaderProgram, "Id1");
	var Is1Pos = gl.getUniformLocation(myShaderProgram, "Is1");
	var alpha1Pos = gl.getUniformLocation(myShaderProgram, "alpha1");
	var spotPos = gl.getUniformLocation(myShaderProgram, "spot");
	
	
	var p1 = [20, 30, 40];
	var ka1 = [.9, .9, .9]; // ambient coefficient
	var kd1 = [.9, .9, .9]; // diffuse
	
	if (specular == true)
		var ks1 = [4.9, 4.9, 4.9];
	else
		var ks1 = [0.0, 0.0, 0.0];
	
	var Ia1 = [200, 100, 100];
	var Id1 = [900, 100, 10];
	var Is1 = [3, 3, 3];
	
	var alpha1 = 10.0;
	
	gl.uniform3fv(p1Pos, p1);
	gl.uniform3fv(ka1Pos, ka1);
	gl.uniform3fv(kd1Pos, kd1);
	gl.uniform3fv(ks1Pos, ks1);
	gl.uniform3fv(Ia1Pos, Ia1);
	gl.uniform3fv(Id1Pos, Id1);
	gl.uniform3fv(Is1Pos, Is1);
	gl.uniform1f(alpha1Pos, alpha1);
	gl.uniform1f(spotPos, spot);
	

    drawObject();

};

// Note: This function created with assistance from web tutorials.
// Couldn't get the one from the slides to work for the life of me.
function createPerspectiveMatrixWithFOV(verticalFov, aspectRatio, near, far){
	
	var fov = 1.0 / Math.tan(radians(verticalFov) / 2);
    var depth = far - near;

    var matrix = mat4(); // initialize identity matrix
    matrix[0][0] = fov / aspectRatio;
    matrix[1][1] = fov;
    matrix[2][2] = (-(near + far)) / depth;
    matrix[2][3] = (-2 * near * far) / depth;
    matrix[3][2] = -1;
    matrix[3][3] = 0.0;

    return matrix;
	
}

// This doesn't seem to work? I might just be giving it the wrong parameters,
// but I have no idea how to obtain the correct ones...
function createPerspectiveMatrix(left, right, bottom, top, near, far){
	
	var matrix = mat4(); // initialize identity matrix
    matrix[0][0] = 2.0*near / (right-left);
    matrix[1][1] = 2.0*near / (top-bottom);
    matrix[2][2] = -((far+near) / (far-near));
    matrix[0][2] = ((left + right) / (right-left));
    matrix[1][2] = ((top + bottom) / (top-bottom));
    matrix[2][3] = -(2.0*(near*far) / (far-near));
	matrix[3][2] = -1.0;
	matrix[3][3] = 0.0;

    return matrix;
}

function createOrthographicMatrix(left, right, bottom, top, near, far){

	var matrix = mat4(); // initialize identity matrix
    matrix[0][0] = 2.0 / (left-right);
    matrix[1][1] = 2.0 / (top-bottom);
    matrix[2][2] = -(2.0 / (far-near));
    matrix[0][3] = -((left + right) / (left-right));
    matrix[1][3] = -((top + bottom) / (top-bottom));
    matrix[2][3] = -((near + far) / (far-near));

    return matrix;
	
}

function createModelViewMatrix(e, a, vu){

    var n = norm(subtract(a, e));  // subtract is built in
    var u = norm(crossProduct(n, vu) ); 
    var l = norm(crossProduct(u, n) );

    n = negate( n ); // Because the above specifies an inverse model view

    var result = mat4(
        vec4(u, -dot(u, e)), // Collapsed from final slide from presentation 9
        vec4(l, -dot(l, e)), // Ditto
        vec4(n, -dot(n, e)), // ^
        vec4(0, 0, 0, 1)
    );

    return result;

}

function calculateNormals(vertices, indexes){
	var facenormal;
	var vertexnormals = [];
	
	for (var i = 0; i < numVertices; i++){
		vertexnormals[i] = new vec3(0, 0, 0);
	}
	
	
	for (var i = 0; i < indexes.length; i+=3){
		//var v1 = [vertices[indexes[i]], vertices[indexes[i+1]]];
		//var v2 = [vertices[indexes[i]], vertices[indexes[i+2]]];
		
		
		p0 = vertices[indexes[i]]; // currently have a vec4 object
		p1 = vertices[indexes[i+1]];
		p2 = vertices[indexes[i+2]];
		
		facenormal = cross(subtract(p1, p0), subtract(p2, p0));
		
		// At this point, we have the face normal. We need to add this face normal to all three of the involved vertices.
		vertexnormals[indexes[i]] = add(vertexnormals[indexes[i]], facenormal);
		vertexnormals[indexes[i+1]] = add(vertexnormals[indexes[i+1]], facenormal);
		vertexnormals[indexes[i+2]] = add(vertexnormals[indexes[i+2]], facenormal);
		
		// We now have a two dimensional array full of indices, and their corresponding 6 face normals.
	}
	
	for (var i = 0; i < vertexnormals.length; i++){
		vertexnormals[i] = norm(vertexnormals[i]);
	}
	
	console.log(vertexnormals);
	
	return vertexnormals;
}

function crossProduct(a, b){
	return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function specularFlip(){
	console.log("Before:",specular);
	if (specular == true)
		specular = false;
	else if (specular == false)
		specular = true;
	
	console.log("After:", specular)
	initGL();
}

function pointFlip(){
	if (point == 1.0){
		point = 0.0;
	}
	else
		point = 1.0;
	initGL();
}

function spotFlip(){
	if (spot == 1.0)
		spot = 0.0;
	else
		spot = 1.0;
	initGL();
}

function norm(a){
	len = length(a);
	
	for ( var i = 0; i < a.length; ++i ) {
        a[i] /= len;
    }
	
	return a;
}

function orth(){
	pro = 2;
	initGL();
}

function persp(){
	pro = 1;
	initGL();
}

function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function drawObject() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
}


