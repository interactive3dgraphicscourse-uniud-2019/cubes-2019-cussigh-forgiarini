let scene, camera, renderer;

/**
 * This variable is an array of Objects containing the various cubes used in the scene
 */
let availableCubes;

let moveWorld;

let show_debug_tools;

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

//
const MAX_DIFFERENCE_ANGLE = Math.pow(10,-6);