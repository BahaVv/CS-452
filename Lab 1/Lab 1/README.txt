Adam Kimball
2/1/16

My implementation of this assignment is fairly simple, and extremely similar to the examples we went over in class.

The program draws three shapes: A triangle, a hexagon, and an ellipse. The triangle is drawn with gl.TRIANGLES, the 
hexagon is drawn with gl.LINE_LOOP, and the ellipse is drawin with gl.TRIANGLE_FAN. The points for the hexagon and 
triangle are generated manually, the ellipse uses the requisite formula, with a precision of 100 points.

After they're generated, all of the points are concatenated into a single array, which is flattened and dumped into
the array buffer. From there, they're all drawn out of the same buffer, indexed into the correct offset to find the
beginning of the data for each shape.

Before each individual draw call, a uniform specified in the fragment shader of type float and size 4 is altered to
a particular RGBA value. Thus, with each draw call, the pixels drawn for a shape are different -- enabling the 
triangle, ellipse, and hexagon to have different colors. 