
/**Creates a Pine Tree
 * 
 * @param {*} dimension     3VECTOR of tree's position
 * @param {*} colorData     {color1, color2, variance} 
 *                          color1-2 are the name of the colors of the leaves
 *                          variance is the color2 presence from 0 (none) to 10 (equal to color1)
 * @param {*} position      3VECTOR of tree's position
 */
function createPine(dimensions, colorData, position) {
    let width = dimensions.x;
    let height = dimensions.y;
    let depth = dimensions.z;
    let tree = new THREE.Object3D();
    let counter = 0; //current heigh built
    let thickness = 1;
    if (depth + width >= 30) thickness = 3;

    colorLog = { color1: "wool_colored_brown" }
    colorLeaves1 = { color1: colorData.color1 };
    colorLeaves2 = { color1: colorData.color2 };
    colorLeavesDouble = { color1: colorData.color1, color2: colorData.color2, variance: colorData.variance };

    // building the log
    tree.add(createRing({ x: thickness, y: Math.floor(height / 3) + 1, z: thickness }, colorLog, { x: 0, y: 0, z: 0 }));
    counter = Math.floor(height / 3) + 1;

    // adding internal part and leaves below the log
    tree.add(createRing({ x: width, y: 1, z: depth }, colorLeavesDouble, { x: 0, y: counter, z: 0 }));
    tree.add(createRing({ x: width, y: 1, z: depth }, colorLeavesDouble, { x: 0, y: counter - 1, z: 0 }));
    tree.add(createRing({ x: width, y: 1, z: depth }, colorLeavesDouble, { x: 0, y: counter - 2, z: 0 }));
    tree.add(createRectangle({ x: width - 2, z: depth - 2 }, colorLeaves2, { x: 0, y: counter, z: 0 }));
    counter++;

    //creating the leaves until the top of the tree
    let spaceleft = height - counter;
    let reductionFactor = Math.min(width, depth) / spaceleft;
    //reduction factor: how much the leaves need to shrink at each level
    if (reductionFactor > 1) reductionFactor = 1;
    for (let i = 0; i < spaceleft; i++) {
        width = width - reductionFactor;
        depth = depth - reductionFactor;
        tree.add(createRing({ x: Math.ceil(width), y: 1, z: Math.ceil(depth) }, colorLeavesDouble, { x: 0, y: counter, z: 0 }));
        counter++;
    }
    //close the top if it's not already
    if ((width != 1) && (depth != 1)) tree.add(createRectangle({
        x: Math.ceil(width) - 2,
        z: Math.ceil(depth) - 2
    }, colorLeavesDouble, { x: 0, y: counter--, z: 0 }));
    tree.position.set(position.x, position.y, position.z);
    return tree;
}

/**
 * Returns a 5x5x5 sun
 * @param {Object} position  3VECTOR indicating position
 */
function createSun(position) {
    let sun = new THREE.Object3D();
    sun.add(createRing({ x: 3, y: 1, z: 1 }, { color1: "wool_colored_yellow" }, { x: 0, y: 0, z: 2 }));
    sun.add(createRing({ x: 3, y: 1, z: 1 }, { color1: "wool_colored_yellow" }, { x: 0, y: 0, z: -2 }));
    sun.add(createRing({ x: 1, y: 1, z: 3 }, { color1: "wool_colored_yellow" }, { x: 2, y: 0, z: 0 }));
    sun.add(createRing({ x: 1, y: 1, z: 3 }, { color1: "wool_colored_yellow" }, { x: -2, y: 0, z: 0 }));
    sun.add(createRing({ x: 3, y: 1, z: 3 }, { color1: "wool_colored_yellow" }, { x: 0, y: 1, z: 0 }));
    sun.add(createRing({ x: 3, y: 1, z: 3 }, { color1: "wool_colored_yellow" }, { x: 0, y: -1, z: 0 }));
    sun.add(createRing({ x: 1, y: 1, z: 1 }, { color1: "wool_colored_yellow" }, { x: 0, y: -2, z: 0 }));
    sun.add(createRing({ x: 1, y: 1, z: 1 }, { color1: "wool_colored_yellow" }, { x: 0, y: 2, z: 0 }));
    sun.position.set(position.x, position.y, position.z);
    return sun;
}