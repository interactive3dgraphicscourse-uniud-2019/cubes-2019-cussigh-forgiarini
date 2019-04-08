/**
 * This file contains global variables used in the scene.
 */

// Scene is an object used by THREE.js representing the scene.
let scene;

// Camera that shows the scene.
let camera; 

// Renderer that render the world
let renderer;

// Controls to move world with the mouse 
let controls;

// Shows frame rate, memory used and time to render a frame
let stats;

// Array of Objects containing the various cubes used in the scene
let availableCubes;

// If true world will be animated, if false is stopped
let moveWorld;

// Shows framerate, axes and area of shadows
const show_debug_tools = false;

// Allow shadows in the scene
const enable_shadows = true;

// Axes used for animations
const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

// Max difference for 2 angle to be considered the same angle
const MAX_DIFFERENCE_ANGLE = Math.pow(10,-6);