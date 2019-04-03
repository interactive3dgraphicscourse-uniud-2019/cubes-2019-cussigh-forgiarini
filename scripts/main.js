/* 
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
  position = typeof position == "undefined" ? new THREE.Vector3(10, 20, 20) : position;
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
  // GROUND
  createGround();
  createLights();

  let windmill = createWindmill({
    width: 8, height: 20, depth: 12,
    colors: { color1: "wool_colored_light_brown", color2: "wool_colored_cyan" },
    position: { x: -21, y: 0, z: -14 }
  });
  //windmill.scale.set(2, 2, 2);
  windmill.rotateOnAxis(Y_AXIS, -Math.PI/4);
  scene.add(windmill);

  //
  let flying_duck_1 = createDuck("wool_colored_yellow", { x: 0, y: 0, z: 0 }, true);
  flying_duck_1.scale.set(0.5,0.5,0.5);
  scene.add(createCicleSphereAnimation({
    objectToAnimate: flying_duck_1,
    spherePosition: new THREE.Vector3(-10, 30, 6),
    radius: 8,
    rotationVector: new THREE.Vector3(0, 1, 0),
    sinMovement: true,
    sinTime: 2000,
    sinMultiplier: 1,
    rotationTime: 20000
  }));

  let flying_duck_2 = createDuck("wool_colored_yellow", { x: 0, y: 0, z: 0 }, true);
  flying_duck_2.scale.set(0.5,0.5,0.5);
  scene.add(createCicleSphereAnimation({
    objectToAnimate: flying_duck_2,
    spherePosition: new THREE.Vector3(10, 30, 6),
    radius: 8,
    rotationVector: new THREE.Vector3(0, 1, 0),
    sinMovement: true,
    sinTime: 4000,
    sinMultiplier: 1,
    rotationTime: 20000
  }));


  let stable = createStable({
    width: 40, height: 10, depth: 20,
    colors: { color1: "wool_colored_light_brown", color2: "wool_colored_beige" },
    position: { x: 15, y: 0, z: -10 }
  });

  scene.add(stable);

  let pig = createPig("wool_colored_light_pink", new THREE.Vector3(3, 0.5, -10));
  pig.scale.set(0.6,0.6,0.6);
  let recintoData = {
    dimensions: {
      x: 18,
      y: 1,
      z: 18,
    },
    position: {
      x: 6,
      y: 0,
      z: -9.5
    }
  };

  let recinto = createRing(recintoData.dimensions, { color1: "wool_colored_brown" }, recintoData.position);
  scene.add(pig);
  scene.add(recinto);

  moveObjectInsideContainer({
    obj: pig,
    bounderies: recintoData,
    fixBounderies: 3,
    directionVector: (new THREE.Vector3(1, 0, 0.5)).normalize(),
    speed: 10,
  });

  let cow_1 = createCow({ color1: "wool_colored_brown", color2: "wool_colored_white", variance: 9 }, {x:30,y:0,z:-15});
  scene.add(cow_1);
  cow_1.scale.set(0.7,0.7,0.7);
  let cow_2 = createCow({ color1: "wool_colored_brown", color2: "wool_colored_white", variance: 7 }, {x:20,y:0,z:-15});
  scene.add(cow_2);
  cow_2.scale.set(0.7,0.7,0.7);
  return;
  let pines = [];

  let pineColor = { color1: "wool_colored_emerald", color2: "wool_colored_turquoise", variance: 5 };

  pines.push(createPine({ x: 4, y: 20, z: 4 }, pineColor, { x: -5, y: 0, z: -4 }));
  pines.push(createPine({ x: 5, y: 6, z: 3 }, pineColor, { x: -10, y: 0, z: 2 }));
  pines.push(createPine({ x: 8, y: 15, z: 8 }, pineColor, { x: -20, y: 0, z: 0 }));
  pines.push(createPine({ x: 15, y: 20, z: 15 }, pineColor, { x: 0, y: 0, z: 30 }));
  pines.push(createPine({ x: 15, y: 40, z: 17 }, pineColor, { x: 30, y: 0, z: 30 }));

  pines.forEach(pine => {
    scene.add(pine);
  });



  //  let terrain = createTerrain();
  //  scene.add(terrain);



}

function init() {
  scene = new THREE.Scene();
  createRenderer();

  createCamera(new THREE.Vector3(10, 10, 20));

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

  initAnimations();

  createScene();

  start_time = Date.now();
  moveWorld = false;

  document.addEventListener("keyup", e =>{
    if(e.key == " "){
      animateOrStopWorld();
    }
  });
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

function animateOrStopWorld() {
  moveWorld = !moveWorld;
  if(moveWorld){
    enableAnimations();
  }
}