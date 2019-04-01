
let controls, stats;

/**
 * Creates an istance of THREE.OrbitControls used to move the camera.
 */
function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //call this only in static scenes (i.e., if there is no animation loop)
  //controls.addEventListener( 'change', render );
}

/**
 * Usefull function to handle resize event of browser. It updates renderer dimensions.
 * @param {Event} e resize event
 */
let resizeListener = e => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * Creates an istance of THREE.WebGLRenderer and links to the body.
 */
function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
}

/**
 * Creates an istance of THREE.PerspectiveCamera and links to the body.
 * If position and lookAt parameters are not passed, camera will be placed at 2,5,10 and look at 0,0,0.
 * 
 * @param {Object} [position] Vector3 of camera position
 * @param {Object} [lookAt]   Vector3 of camera lookAt
 */
function createCamera(position, lookAt) {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  position = typeof position == "undefined" ? new THREE.Vector3(2, 5, 10) : position;
  camera.position.set(position.x, position.y, position.z);
  lookAt = typeof lookAt == "undefined" ? new THREE.Vector3(0, 0, 0) : lookAt;
  camera.lookAt(lookAt);
}

function createGround() {
  let groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
  let groundMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x050505
  });
  groundMat.color.setHSL(0.095, 1, 0.75);

  let ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.5;
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}

let cowWrapper;
let cowContainer;

function createScene() {
  let house = createHouse({
    width: 10,
    height: 6,
    depth: 10,
    roofHeight: 2,
    windowsNumber: 2,
    chimney: 1,
  });

  //scene.add(house);
  // GROUND
  createGround();

  //drawAvailableCubes(new THREE.Vector3(0, 0, 0));
  let animals = [];

  let pineColor = { color1: "wool_colored_emerald", color2: "wool_colored_turquoise", variance: 5 };
  //scene.add(createPine({x:5,y:20,z:5},pineColor, {x:0, y:0, z:0}));
  scene.add(createPine({ x: 5, y: 6, z: 3 }, pineColor, { x: -20, y: 0, z: 10 }));
  scene.add(createPine({ x: 8, y: 15, z: 8 }, pineColor, { x: -20, y: 0, z: 0 }));
  scene.add(createPine({ x: 15, y: 10, z: 15 }, pineColor, { x: 20, y: 0, z: 25 }));
  scene.add(createPine({ x: 15, y: 40, z: 17 }, pineColor, { x: 30, y: 0, z: 15 }));

  animals.push(createDuck("wool_colored_yellow", { x: -5, y: 0, z: 10 }));
  animals.push(createPig("wool_colored_light_pink", { x: 4, y: 0, z: 10 }));
  animals.forEach(anim => {
    scene.add(anim);
  });
  cowWrapper = new THREE.Object3D();
  cowContainer = new THREE.Object3D();
  cowContainer.position.set(0,0,0);
  cowWrapper.add(cowContainer);
  
  cowContainer.add(createCow({
    color1: "wool_colored_brown",
    color2: "wool_colored_white",
    variance: 5
  },
    {
      x: 0,
      y: 0,
      z: 0
    }));
  scene.add(cowWrapper);

  let stable = createStable({
    width:16,height:10, depth:16, 
    colors:{color1:"wool_colored_light_brown", color2:"wool_colored_beige"}, 
    position:{x:0,y:0,z:0} 
  });
  stable.scale.set(2,2,2);

  let windmill = createWindmill({
    width:10,height:20, depth:11,
    colors:{color1:"wool_colored_light_brown", color2:"wool_colored_cyan"}, 
    position:{x:-40,y:0,z:0} 
  });
  windmill.scale.set(2,2,2);

  scene.add(stable);
  scene.add(windmill);
  createLights();
}

function init() {
  scene = new THREE.Scene();
  createRenderer();

  createCamera(new THREE.Vector3(2, 5, 10));

  // creating stats of frame
  stats = createStats();
  // uncomment if you need to draw coordinate axes when building the scene
  Coordinates.drawAllAxes();

  // controls for camera
  createControls();

  // add listener for resize event of window to update renderer
  window.addEventListener("resize", resizeListener, false);

  // loading texture and creating avaiable cubes for the scene
  loadCubes();

  createScene();

  start_time = Date.now();
  moveWorld = false;

  updateWorld();
}

function updateWorld() {
  requestAnimationFrame(updateWorld);
  animateWorld();
  controls.update();
  stats.update();
  renderWorld();
}

function renderWorld() {
  renderer.render(scene, camera);
}
