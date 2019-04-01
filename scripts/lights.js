
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
        var d = 100;
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 150;
        dirLight.shadow.mapSize.x = 1024;
        dirLight.shadow.mapSize.y = 1024;

    }
    return dirLight;
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
        position: new THREE.Vector3(50,25,0),
        shadow: {
            enabled: false,
            width: 1024,
            height: 1024
        }
    });
    //scene.add(dirLight);
    
    //var helper = new THREE.CameraHelper(dirLight.shadow.camera);
    //scene.add(helper);
}
