let scene, camera, renderer, controls, stats;

/**
 * This variable is an array of Objects containing the various cubes used in the scene
 */
let availableCubes;

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

/**
 * Create a HemisphereLight using passed data.
 * 
 * @param {Object} data             Data to use
 * @param {Number} data.color       Hex value of the color of the light
 * @param {Number} data.groundColor Hex value of the ground color of the light
 * @param {Number} data.intensity   Intensity of the light in range [0,1]
 * @param {Object} data.position    Position of the light
 * @return {Object}                 Istance of a THREE.js Hemisphere light
  */
function createHemiLight(data) {
  let color = data.color,
    groundColor = data.groundColor,
    intensity = data.intensity,
    position = data.position;
  let hemiLight;
  hemiLight = new THREE.HemisphereLight(color, groundColor, intensity);
  hemiLight.position.set(position.x, position.y, position.z);
  return hemiLight;
}

/**
 * Creates a directional light with given data.
 *
 * Position of the light is described by a THREE.Vector3 object.
 *
 * If shadows are enabled, width and height of shadow map are required.
 *
 * @param {Object}  data                 Data used to create the directional light.
 * @param {Number}  data.color           Hex value of color
 * @param {Number}  data.intensity       Intensity of the light in the range [0,1]
 * @param {Object}  data.position        position of the light
 * @param {Object}  data.shadow          Shadow data to apply
 * @param {Boolean} data.shadow.enabled  Boolean to enable shadows
 * @param {Number}  [data.shadow.width]  Width of shadow mapSize
 * @param {Number}  [data.shadow.height] Height of shadow mapSize
 * @return {Object}                      Istance of a THREE.js directional light
 */
function createDirectionalLight(data) {
  let dirLight;
  dirLight = new THREE.DirectionalLight(data.color, data.intensity);
  dirLight.position.set(data.position.x, data.position.y, data.position.z);

  if (data.shadow.enabled) {
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = data.shadow.width;
    dirLight.shadow.mapSize.height = data.shadow.height;
  }
  return dirLight;
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

function loadWools(loader, geometry, woolColors) {

  for (let i = 0, n = woolColors.length; i < n; i++) {
    let name = "wool_colored_" + woolColors[i];
    // load texture
    let texture = loader.load(name + ".png");

    // immediately use the texture for material creation
    let material = new THREE.MeshPhongMaterial({ map: texture });
    let cube = new THREE.Mesh(geometry, material);

    // enable cube shadow
    cube.castShadow = true;
    cube.receiveShadow = true;

    // saving reference for the cube
    let id = availableCubes.length;
    availableCubes.push({
      id: id,
      name: name,
      cube: cube
    });
  }
}

function loadCubes() {
  availableCubes = [];

  // instantiate a loader
  let loader = new THREE.TextureLoader();

  // setting textures path
  loader.setPath('textures/');

  // creating only one geometry for every cube
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  // wools color to load
  let woolColors = [
    "black",
    "blue",
    "brown",
    "cyan",
    "gray",
    "green",
    "light_blue",
    "lime",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "silver",
    "white",
    "yellow",
  ];
  loadWools(loader, geometry, woolColors);
}

function createLights() {

  hemiLight = createHemiLight({
    color: rgbToHex(255, 255, 255),
    groundColor: rgbToHex(255, 255, 255),
    intensity: 0.6,
    position: new THREE.Vector3(0, 500, 0)
  });
  scene.add(hemiLight);

  dirLight = createDirectionalLight({
    color: rgbToHex(255, 255, 255),
    intensity: 1,
    position: new THREE.Vector3(20, 20, 20),
    shadow: {
      enabled: true,
      width: 1024,
      height: 1024
    }
  });
  scene.add(dirLight);
}

function drawAvailableCubes(position) {
  let side = Math.ceil(Math.sqrt(availableCubes.length));
  let k = 0;
  let i, j;
  let flagEndCubes = false;
  let palette = new THREE.Object3D();

  for (i = 0; i < side; i++) {
    for (j = 0; j < side; j++) {
      let obj = new THREE.Object3D();
      obj.add(availableCubes[i * 4 + j].cube.clone());
      obj.position.set(i, j, 0);
      palette.add(obj);
      k++;
      if (k == availableCubes.length) {
        flagEndCubes = true;
        break;
      }
    }
    if (flagEndCubes) {
      break;
    }
  }
  palette.position.set(position.x, position.y, position.z);
  scene.add(palette);
}

function createScene() {
  // GROUND
  createGround();

  drawAvailableCubes(new THREE.Vector3(0, 0, 0));

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

  updateWorld();
}

function updateWorld() {
  requestAnimationFrame(updateWorld);

  controls.update();
  stats.update();
  renderWorld();
}

function renderWorld() {
  renderer.render(scene, camera);
}
