/**
 * Creates an istance of THREE.OrbitControls used to move the camera.
 */
function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // disabling key commands for conflics on arrow key events
  controls.enableKeys = false;

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
  position =
    typeof position == "undefined" ? new THREE.Vector3(10, 20, 20) : position;
  camera.position.set(position.x, position.y, position.z);
  lookAt = typeof lookAt == "undefined" ? new THREE.Vector3(0, 0, 0) : lookAt;
  camera.lookAt(lookAt);
}

/**
 * Creates scene and animate it
 */
function createScene() {
  // LIGHTS
  createLights();

  // TERRAIN
  let terrain = createTerrain();
  scene.add(terrain);

  // BUILDES
  let windmill = createWindmill({
    width: 8,
    height: 20,
    depth: 12,
    colors: {
      color1: "wool_colored_light_brown",
      color2: "wool_colored_red"
    },
    position: { x: -21, y: 8, z: -14 }
  });
  windmill.rotateOnAxis(Y_AXIS, -Math.PI / 4);
  scene.add(windmill);
  
  let recintoData = {
    dimensions: {
      x: 18,
      y: 1,
      z: 18
    },
    position: {
      x: 6,
      y: 0,
      z: -9.5
    }
  };

  let recinto = createRing(
    recintoData.dimensions,
    { color1: "wool_colored_brown" },
    recintoData.position
  );
  scene.add(recinto);

  let stable = createStable({
    width: 40,
    height: 10,
    depth: 20,
    colors: {
      color1: "wool_colored_light_brown",
      color2: "wool_colored_beige"
    },
    position: { x: 15, y: 0, z: -10 }
  });

  scene.add(stable);

  // ANIMALS
  let flying_duck_1 = createDuck(
    "wool_colored_white",
    { x: 0, y: 0, z: 0 },
    true,
    true
  );
  flying_duck_1.scale.set(0.5, 0.5, 0.5);
  scene.add(
    createCicleSphereAnimation({
      objectToAnimate: flying_duck_1,
      spherePosition: new THREE.Vector3(-10, 30, 6),
      radius: 30,
      rotationVector: new THREE.Vector3(0, 1, 0),
      sinMovement: true,
      sinCicles: 7,
      sinMultiplier: 2,
      rotationTime: 6000,
      inverseRotation: false
    })
  );

  let flying_duck_2 = createDuck(
    "wool_colored_silver",
    { x: 0, y: 0, z: 0 },
    true,
    true
  );
  flying_duck_2.scale.set(0.5, 0.5, 0.5);
  scene.add(
    createCicleSphereAnimation({
      objectToAnimate: flying_duck_2,
      spherePosition: new THREE.Vector3(10, 30, 6),
      radius: 30,
      rotationVector: new THREE.Vector3(0, 1, 0),
      sinMovement: true,
      sinCicles: 5,
      sinMultiplier: 4,
      rotationTime: 8000,
      inverseRotation: false
    })
  );

  let flying_duck_3 = createDuck(
    "wool_colored_silver",
    { x: 0, y: 0, z: 0 },
    true,
    true
  );
  flying_duck_3.scale.set(0.5, 0.5, 0.5);
  scene.add(
    createCicleSphereAnimation({
      objectToAnimate: flying_duck_3,
      spherePosition: new THREE.Vector3(0, 40, 6),
      radius: 20,
      rotationVector: new THREE.Vector3(0, 1, 1),
      sinMovement: true,
      sinCicles: 3,
      sinMultiplier: 3,
      rotationTime: 8000,
      inverseRotation: true
    })
  );

  let pig = createPig(
    "wool_colored_light_pink",
    new THREE.Vector3(3, 0.5, -10)
  );
  pig.scale.set(0.6, 0.6, 0.6);

  scene.add(pig);

  moveObjectInsideContainer({
    obj: pig,
    bounderies: recintoData,
    fixBounderies: 3,
    directionVector: new THREE.Vector3(1, 0, 0.5).normalize(),
    speed: 5
  });

  let cow_1 = createCow(
    {
      color1: "wool_colored_brown",
      color2: "wool_colored_white",
      variance: 9
    },
    { x: 30, y: 0, z: -10 }
  );
  scene.add(cow_1);
  cow_1.scale.set(0.7, 0.7, 0.7);
  let cow_2 = createCow(
    {
      color1: "wool_colored_brown",
      color2: "wool_colored_white",
      variance: 7
    },
    { x: 20, y: 0, z: -3 }
  );
  scene.add(cow_2);
  cow_2.scale.set(0.7, 0.7, 0.7);
  
  let duck_lake = createDuck("wool_colored_yellow", { x: 0, y: 0, z: 0 }, true);
  duck_lake.scale.set(0.5, 0.5, 0.5);
  scene.add(
    createLineAnimation({
      objectToAnimate: duck_lake,
      tripPoints: [
        new THREE.Vector3(-20, -12.5, 28),
        new THREE.Vector3(20, -12.5, 28),
      ],
      bounce: true,
      speed: 5,
      sinMovement: true,
      sinCicles: 3,
      sinMultiplier: 2
    })
  );
  
  // NATURE
  let pines = [];
  
  let pineColor = {
    color1: "wool_colored_emerald",
    color2: "wool_colored_turquoise",
    variance: 5
  };

  pines.push(
    createPine({ x: 7, y: 20, z: 6 }, pineColor, { x: 26, y: 0, z: 10 })
  );
  pines.push(
    createPine({ x: 3, y: 12, z: 4 }, pineColor, { x: 30, y: 0, z: 18 })
  );
  pines.push(
    createPine({ x: 3, y: 12, z: 4 }, pineColor, { x: -12, y: 8, z: -20 })
  );
  pines.push(
    createPine({ x: 3, y: 7, z: 4 }, pineColor, { x: -30, y: 8, z: -3 })
  );
  pines.forEach(pine => {
    scene.add(pine);
  });

}

function init() {
  scene = new THREE.Scene();

  createRenderer();

  createCamera(new THREE.Vector3(26, 31, 88));

  // controls for camera
  createControls();

  // creating stats of frame
  if (show_debug_tools) {
    stats = createStats();
    // uncomment if you need to draw coordinate axes when building the scene
    Coordinates.drawAllAxes();
  }

  // add listener for resize event of window to update renderer
  window.addEventListener("resize", resizeListener, false);
  
  // loading texture and creating avaiable cubes for the scene
  loadCubes();
  
  initAnimations();
  
  createScene();
  
  linkUserEvents();

  updateWorld();
}

function updateWorld() {
  requestAnimationFrame(updateWorld);
  animateWorld();
  controls.update();
  if (show_debug_tools) {
    stats.update();
  }
  renderWorld();
}

function renderWorld() {
  renderer.render(scene, camera);
}

function animateOrStopWorld() {
  moveWorld = !moveWorld;
  if (moveWorld) {
    enableAnimations();
  }
}
