
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
        "turquoise",
        "emerald",
        "light_pink",
        "test",
        "light_brown",
        "beige",
        "light_green"
    ];
    loadWools(loader, geometry, woolColors);
}

function getBlockPosition(name) {
    if (typeof name === "undefined") {
        return -1;
    }
    for (let i = 0; i < availableCubes.length; i++) {
        if (availableCubes[i].name == name) {
            return i;
        }
    }
    return -1;
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


/**
 * Creates a rectangle of boxes with heigth=1
 * Height is fixed because internal boxes of a parallelepiped should not be constructed
 * 
 * @param {*} dimensions    rectangle's width and depth
 * @param {*} colorData     {color1, color2, variance} 
 *                          color1-2 are the name of the colors
 *                          variance is the color2 presence from 0 (none) to 10 (equal to color1)
 * @param {*} position      3VECTOR of rectangle's position
 */

function createRectangle(dimensions, colorData, position) {
    let width = dimensions.x;
    let depth = dimensions.z;
    let rectangle = new THREE.Object3D();
    let cube;

    //if second color is passed to the function, randomly decides which color to choose
    if (typeof colorData.color2 !== "undefined") {
        let idColor1 = getBlockPosition(colorData.color1);
        let idColor2 = getBlockPosition(colorData.color2);
        let currentId;
        let varianceFact = colorData.variance;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < depth; j++) {
                if (Math.floor(Math.random() * 21) >= varianceFact) currentId = idColor1;
                else currentId = idColor2;
                cube = availableCubes[currentId].cube.clone();
                cube.position.set(i - width / 2 + 0.5, 0, j - depth / 2 + 0.5);
                rectangle.add(cube);
            }
        }
    }
    //if second color is undefined, uses only color1
    else {
        let idColor1 = getBlockPosition(colorData.color1);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < depth; j++) {
                cube = availableCubes[idColor1].cube.clone();
                cube.position.set(i - width / 2 + 0.5, 0, j - depth / 2 + 0.5);
                rectangle.add(cube);
            }
        }
    }
    rectangle.position.set(position.x, position.y, position.z);
    return rectangle;
}


/**Creates a ring of boxes (a cylinder without top and bottom faces)
 * 
 * @param {Object} dimensions    3VECTOR of ring's dimensions
 * @param {Object} colorData     {color1, color2, variance} 
 * @param {String} colorData.color1 name of the color
 * @param {String} colorData.color2 name of the color
 * @param {Number} colorData.variance is the color2 presence from 0 (none) to 10 (equal to color1)
 * @param {Object} position      3VECTOR of ring's position
 */
function createRing(dimensions, colorData, position) {
    let width = dimensions.x;
    let height = dimensions.y;
    let depth = dimensions.z;
    let ring = new THREE.Object3D();
    let cube;

    //if second color is passed to the function, randomly decides which color to choose
    if (typeof colorData.color2 !== "undefined") {
        let idColor1 = getBlockPosition(colorData.color1);
        let idColor2 = getBlockPosition(colorData.color2);
        let variance = colorData.variance;
        for (let h = 0; h < height; h++) {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < depth; j++) {
                    if ((i == 0 || i == width - 1) || (j == 0 || j == depth - 1)) {
                        if (Math.floor(Math.random() * 21) >= variance) currentId = idColor1;
                        else currentId = idColor2;
                        cube = availableCubes[currentId].cube.clone();
                        cube.position.set(i - width / 2 + 0.5, h, j - depth / 2 + 0.5);
                        ring.add(cube);
                    }
                }
            }
        }
    }

    //if second color is undefined, uses only color1
    else {
        let idColor1 = getBlockPosition(colorData.color1);
        for (let h = 0; h < height; h++) {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < depth; j++) {
                    if ((i == 0 || i == width - 1) || (j == 0 || j == depth - 1)) {
                        cube = availableCubes[idColor1].cube.clone();
                        cube.position.set(i - width / 2 + 0.5, h, j - depth / 2 + 0.5);
                        ring.add(cube);
                    }
                }
            }
        }
    }
    ring.position.set(position.x, position.y, position.z);
    return ring;
}
/**
 * returns a cube from availablecubes
 * 
 * @param {String} color    color name of the block
 * @param {Object} position 3VECTOR of the position of the stable
 */
function createBlock(color, position) {
    let currentId = getBlockPosition(color);
    let cube = availableCubes[currentId].cube.clone();
    cube.position.set(position.x, position.y, position.z);
    return cube;
}
