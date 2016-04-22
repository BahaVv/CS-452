Adam Kimball					Lab 4 Simplified


1) My 'look at' method is implemented via the makeModelViewMatrix() method. The eye is at
[-14, 10, -5], the eye is pointed at the origin [0,0,0], and our up vector is [0,1,0].
After construction (Via the formula given in the slides), this matrix is left-multiplied
onto each vertex on screen, which gives us the final transformed point.

2) These are implemented via createOrthographicMatrix and createPerspectiveMatrixWithFOV. As 
the names would suggest, the Orthographic matrix is performed exactly according to the slides
(near, far, left, right, etc), which gives us a projection parallel to the object. The perspective
projection is also done according to the slides, but in this instance, I used the version that 
creates top and right with vertical fov and aspect ratio, respectively. I did this exclusively
because, for whatever reason, I couldn't get the 'recommended' variation from the end of the viewing
presentation to properly function.

3) I use a point light and a spot light, both on opposite faces of the chair. The point light
is directly facing the camera (especially in perspective mode), and the spot light is on the 
opposite edge. Each light uses ambient, diffuse, and specular components, all of the math for
which is implemented in the vertex shader. They can be toggled individually -- both on, one on,
or both off. This is implemented by simply setting a variable to 1 or 0 for either, and then
multiplying by that variable in the vertex shader -- so if one source is disabled (0), its 
values are stripped out of the final calculation due to being multiplied by 0.

4) This should be fully functioning as well. I simply set the specular coefficient (ks) for both
light sources to 0 when specular lighting is disabled. 

The vertex normals are fully calculated, passed through, and are used for Gourad shading. I do not
use the Phong lighting model at all.

5) I believe I have written this README to discuss my implementation method

6) Yup, name's there!