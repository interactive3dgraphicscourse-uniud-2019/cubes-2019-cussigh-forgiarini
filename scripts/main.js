let scene, camera, renderer, controls, stats;

function linkStats() {
  stats = new Stats();
  stats.domElement.style.position = "absolute";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //call this only in static scenes (i.e., if there is no animation loop)
  //controls.addEventListener( 'change', render );
}

let resizeListener = e => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

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

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(2, 2, 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function createCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  // instantiate a loader
  let loader = new THREE.TextureLoader();

  // load a resource
  loader.load(
    // resource URL
    "textures/11635.jpg",

    // onLoad callback
    texture => {
      let material = new THREE.MeshPhongMaterial({ map: texture });
      let cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;

      scene.add(cube);
    },

    // onProgress callback currently not supported
    undefined,

    // onError callback
    err => {
      console.error("An error happened.");
      console.error(err);
    }
  );
}

function createHemiLight() {
  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);
}

function createDirectionalLight() {
  dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(50);
  scene.add(dirLight);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
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
  scene.add(ground);
  ground.receiveShadow = true;
}

function init() {
  console.log("commit");
  scene = new THREE.Scene();
  createRenderer();
  createCamera();
  createCube();

  createHemiLight();
  createDirectionalLight();

  // GROUND
  createGround();

  linkStats();

  // uncomment if you need to draw coordinate axes when building the scene
  Coordinates.drawAllAxes();

  createControls();

  window.addEventListener("resize", resizeListener, false);
  Update();
}

function Update() {
  requestAnimationFrame(Update);

  controls.update();
  stats.update();

  Render();
}

function Render() {
  renderer.render(scene, camera);
}
