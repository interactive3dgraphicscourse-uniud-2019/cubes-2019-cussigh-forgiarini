let scene, camera, renderer, controls, stats;

/**
 * This variable is an array of Objects containing the various cubes used in the scene
 */
let availableCubes;

let world;

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
    "black",      //0
    "blue",       //1
    "brown",      //2
    "cyan",       //3
    "gray",       //4
    "green",      //5
    "light_blue", //6
    "lime",       //7
    "magenta",    //8
    "orange",     //9
    "pink",       //10
    "purple",     //11
    "red",        //12
    "silver",     //13
    "white",      //14
    "yellow",     //15
    "turquoise",  //16
  ];
  loadWools(loader, geometry, woolColors);
}

function getBlockID(name) {
  if( typeof name === "undefined"){
    return;
  }
  for(let i=0; i<availableCubes.length; i++){
    if(availableCubes[i].name == name){
      return i;
    }
  }
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
  world = [];
  let i, j, k;
  let worldEdge = 10;
  let worldHeight = 1;

  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh = new THREE.MeshBasicMaterial({color: "green", wireframe: true});
  let cube = new THREE.Mesh(geometry, mesh);
  //scene.add(cube);

  for(i=0; i<worldEdge; i++){
    world[i] = [];
    for(j=0; j<worldHeight; j++){
      world[i][j] = [];
      for(k=0; k<worldEdge; k++){
        let obj = new THREE.Object3D();
        obj.add(cube.clone());
        obj.position.set(i, j, k);
        world[i][j][k] = obj;
        scene.add(world[i][j][k])
      }
    }
  }

  console.log(world);
  // GROUND
  createGround();

  //drawAvailableCubes(new THREE.Vector3(0, 0, 0));
  scene.add(createPine({x:5,y:20,z:5},3, {x:0, y:0, z:0}));
  scene.add(createPine({x:5,y:6,z:3},3, {x:10, y:0, z:10}));
  scene.add(createPine({x:8,y:15,z:8},3, {x:10, y:0, z:0}));
  scene.add(createPine({x:15,y:10,z:15 },3, {x:20, y:0, z:20}));
  scene.add(createPine({x:15,y:40,z:17 },3, {x:0, y:0, z:20}));
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

/**Creates a Pine Tree
 * 
 * @param {*} dimension     3VECTOR of tree's position
 * @param {*} id            leaves color identifier
 * @param {*} position      3VECTOR of tree's position
 */
function createPine(dimensions, id, position) {
  let width = dimensions.x;
  let height = dimensions.y;
  let depth = dimensions.z;
  let tree = new THREE.Object3D();
  let counter=0; //current heigh built
  let thickness = 1;
  let variance = 4;
  if (depth+width>=30) thickness = 3;

  // building the log
  tree.add(createRing({x:thickness,y:Math.floor(height/3)+1,z:thickness},2,{x:0,y:0,z:0}));
  counter = Math.floor(height/3)+1;
  
  // adding internal part and leaves below the log
  tree.add(createRing({x:width,y:1, z:depth},id,{x:0,y:counter,z:0}));
  tree.add(createRing({x:width,y:1, z:depth},id,{x:0,y:counter-1,z:0}));
  tree.add(createRing({x:width,y:1, z:depth},id,{x:0,y:counter-2,z:0}));
  tree.add(createRectangle({x:width-2, z:depth-2},7,{x:0,y:counter,z:0}));
  counter++;

  //creating the leaves until the top of the tree
  let spaceleft = height - counter;
  let reductionFactor = Math.min(width, depth) / spaceleft;
  //reduction factor: how much the leaves need to shrink at each level
  if (reductionFactor > 1) reductionFactor=1;
  for(let i=0; i<spaceleft; i++) {
    width = width - reductionFactor;
    depth = depth - reductionFactor;
    tree.add(createRing({x:Math.ceil(width), y:1, z:Math.ceil(depth)},id, {x:0,y:counter, z:0}));
    counter++;
  }
  //close the top if it's not already
  if ((width!=1)&&(depth!=1)) tree.add(createRectangle({x:Math.ceil(width)-2, z:Math.ceil(depth)-2},id, {x:0,y:counter--, z:0}));
  tree.position.set(position.x, position.y, position.z);
  return tree;
}


/**
 * Creates a rectangle of boxes with heigth=1
 * Height is fixed because internal boxes of a parallelepiped should not be constructed
 * 
 * @param {*} dimensions    rectangle's width and depth
 * @param {*} id            color identifier 
 * @param {*} position      3VECTOR of rectangle's position
 */

/* function createRectangle(dimensions, id1, id2, varfact, position) {
  let width = dimensions.x;
  let depth = dimensions.z;
  let rectangle = new THREE.Object3D();
  let cube;
  let variance, currentid;
  let varianceFact = varfact
  if (id1 == id2) {
    variance = false;
    currentid = id1;
  }
  else {
    variance = true;
    currentid = id1;
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < depth; j++) {
      if(variance) {
        if(Math.floor(Math.random() * 21)>=varianceFact) currentid =id1;
        else currentid = id2;
      }
      cube = availableCubes[currentid].cube.clone();
      cube.position.set(i - width / 2 + 0.5, 0, j - depth / 2 + 0.5);
      rectangle.add(cube);
    }
  }
  rectangle.position.set(position.x,position.y,position.z);
  return rectangle;
}
*/

function createRectangle(dimensions, id, position) {
  let width = dimensions.x;
  let depth = dimensions.z;
  let rectangle = new THREE.Object3D();
  let cube;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < depth; j++) {
      cube = availableCubes[id].cube.clone();
      cube.position.set(i - width / 2 + 0.5, 0, j - depth / 2 + 0.5);
      rectangle.add(cube);
    }
  }
  rectangle.position.set(position.x,position.y,position.z);
  return rectangle;
}

/**Creates a ring of boxes (a cylinder without top and bottom faces)
 * 
 * @param {*} dimensions    ring's width and depth
 * @param {*} id            color identifier 
 * @param {*} position      3VECTOR of ring's position
 */
function createRing(dimensions, id, position) {
  let width = dimensions.x;
  let height = dimensions.y;
  let depth = dimensions.z;
  let ring = new THREE.Object3D();
  let cube;
  for (let h = 0; h < height; h++){
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < depth; j++) {
        if((i==0||i==width-1)||(j==0||j==depth-1)) {
          cube = availableCubes[id].cube.clone();
          cube.position.set(i - width / 2 + 0.5, h, j - depth / 2 + 0.5);
          ring.add(cube);
        }
      }
    }
  }
  ring.position.set(position.x,position.y,position.z);
  return ring;
}