Adam Kimball
Lab 5

For all implementation details for Lab 3 (including the controls for this lab), see Lab 3 README below this readme.

My image is loaded through creating an HTML element, then getting that by element ID in the javascript. I do not modulate the texture with a color value, because it looked rather terrible. 
Same for lighting and shading.

All faces are textured.

For magnification and minification, I use the simplest TEXTURE_MAG/MIN_FILTER function calls.

My texture filtering is simply Linear. 

I use the clamp functions for texture wrapping.

My texture is not a power of 2, and as such, don't use mipmapping.

-------------------

LAB 3 README

Greetings, grader person!

The key binds for this program are as follows:

W/S: Translate shape up/down (+y/-y)

A/D: Translate shape left/right (-x/+y)

T/G: Scale shape up/down (+y/-x)

F/H: Scale shape left/right (-x/+y)

I/K: Rotate shape up/down (around the X axis)

J/L: Rotate shape left/right (around the Y axis)

U/O: Rotate shape forward/backward (around the Z axis)

That is, WASD controls movement, TFGH controls scaling, and IJKL controls rotation, with U and O
additionally rotating on the Z axis. If you consider each grouping to be similar to a set of 
arrow keys as per their location on the keyboard, it makes more sense.

I am composing my transformations in the following order:

position -> translate -> rotate X -> rotate Y -> rotate Z -> scale

I rotate, scale, and translate by 0.1f, or 5% (since the range is -1.0 to 1.0), per input. This is 
per keypress, or if the key is held for a short while, roughly 60 times per second.

My approach for this problem was to try each transformation separately to see how they looked. I 
first implemented rotation for X, Y, then Z. Then, I implementated translation -- to make sure 
I could compose rotation and translation correctly. Unfortunately I do not center the rotation 
around the shape, but rather around the point the shape was at at the beginning of rotation. I
then implemented scaling, and inserted it at the last step of composition, as I felt that it'd be
relatively independent of the rest of the operations. I also took pains to ensure that, throughout
the codebase, I kept accessing of all uniforms out of the render function. I'm aware it doesn't 
matter terribly much, but my program should be incredibly fast, because in each frame the render
function only issues a redraw for all of the triangles on screen. All other logic is performed on
key press. I'm mildly proud of it. =D

As for the scoring:

1) I drew a pyramid
2) Each vertice has a different color, with face color interpolation. No repeated colors.
3) X/Y/Z rotation is implemented
4) X/Y scaling is implemented
5) X/Y translation is implemented
6) Composition listed above
7) Composition discussion is above
8) Implementation discussion and keys are above

I didn't use any of the built-ins, and I believe I've answered all of the questions asked of me on
the moodle page, so I suppose that ends this README.