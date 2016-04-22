Adam Kimball
2/16/16

The program begins by drawing a hexagon on the screen, using TRIANGLE_FAN as the render method, with 6 vertices wound in counter-clockwise fashion. After running through and initializing all of the values to begin the program, we hit the render() function, which is the main event loop for the application.

Direction changing is handled via the html "onkeypress" flag, which jumps into an internal function that reads the keypress via its event.code value -- "KeyW", "KeyA", etc. This function sets the direction variable to a value between 0 and 3, corresponding to W, A, S, or D (Up, down, left, or right), respectively. Each iteration, the render loop checks to see what the value of that variable is, and alters the mouseCoords variable in the vertex shader accordingly. The mouseCoords are, in this way, actually a coordinate offset added to each vertex on the shape after their rotation calculation.

Rotation is handled by simply using the math gone over in class (basic trig used on the unit circle). The internal variable 'theta' is increased gradually with each pass of the render function (assuming 'rotate' is true). This is then bound to the uniform in my vertex shader, which uses the aforementioned math to update each vertex position.

As hinted at above, clicking the buttons for starting/stopping rotation just turns the rotation variable to true or false. The update to increasing theta is ignored or committed accordingly due to a check for rotation's value in the render method.

I also added a start and stop movement button. It's accomplished with a simple if check around the movement update in render, just like rotate. The buttons launch functions that set movement to true or false. This is neat, because it preserves your previous speed instead of having to click the buttons until the speed hits '0'. Give it a try!

Increasing and decreasing the speed is handled by a simple 'speed' variable, which defaults to 1. Clicking the speed buttons launches a corresponding function that will increase or decrease the internal variable by 0.5 -- this value is then multiplied with the rotation and movement modifiers during each iteration of the render loop to change the speed. As a result, speed changes somewhat dramatically with each press. Also, because the wording in the assignment was somewhat ambiguous, I did set the function to multiply speed against movement AND rotation speed -- I'm unsure that the latter was necessary. If not, removing it would be as simple as removing "* speed" from line 36.