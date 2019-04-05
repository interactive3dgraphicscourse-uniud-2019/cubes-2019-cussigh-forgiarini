
/**
 * Creates a duck 3x6x9
 * 
 * @param {*} color    color name of the duck
 * @param {*} position 3VECTOR position
 */

function createBigDuck(color, position) {
    idColor = getBlockPosition(color);
    let duck = new THREE.Object3D();
    let feet = new THREE.Object3D();
    //body
    duck.add(createRectangle({ x: 3, z: 4 }, { color1: color }, { x: 0, y: 1, z: 0 }));
    duck.add(createRing({ x: 3, y: 1, z: 6 }, { color1: color }, { x: 0, y: 2, z: 0 }));
    duck.add(createRectangle({ x: 3, z: 5 }, { color1: color }, { x: 0, y: 3, z: -1.5 }));
    duck.add(createRing({ x: 3, y: 1, z: 2 }, { color1: color }, { x: 0, y: 3, z: 2 }));

    //head
    duck.add(createRing({ x: 3, y: 1, z: 4 }, { color1: color }, { x: 0, y: 4, z: 2 }));
    duck.add(createRectangle({ x: 3, z: 2 }, { color1: color }, { x: 0, y: 6, z: 3 }));
    duck.add(createRing({ x: 3, y: 1, z: 2 }, { color1: color }, { x: 0, y: 5, z: 2 }));

    //eyes
    duck.add(createBlock("wool_colored_black", { x: -1, y: 5, z: 3.5 }));
    duck.add(createBlock(color, { x: 0, y: 5, z: 3.5 }));
    duck.add(createBlock("wool_colored_black", { x: 1, y: 5, z: 3.5 }));

    //beak
    duck.add(createRectangle({ x: 3, z: 1 }, { color1: "wool_colored_orange" }, { x: 0, y: 4, z: 4.5 }));

    //feet
    feet.add(createRectangle({ x: 1, z: 2 }, { color1: "wool_colored_orange" }, { x: -1, y: 0, z: 0 }));
    feet.add(createRectangle({ x: 1, z: 2 }, { color1: "wool_colored_orange" }, { x: 1, y: 0, z: 0 }));
    duck.add(feet);

    duck.position.set(position.x, position.y, position.z);
    return duck;
}

/**
 * Creates a duck 5x5x7
 * 
 * @param {*} color    color name of the duck
 * @param {*} position 3VECTOR position
 * @param {Boolean} center flag to center duck also in y axes
 * @param {Boolean} wings       if true wings are open
 */

function createDuck(color, position, center, wings) {
    idColor = getBlockPosition(color);
    let duck = new THREE.Object3D();
    let feet = new THREE.Object3D();
    //body
    duck.add(createRectangle({ x: 3, z: 4 }, { color1: color }, { x: 0, y: 1, z: 0.5 }));
    duck.add(createRectangle({ x: 3, y: 1, z: 6 }, { color1: color }, { x: 0, y: 2, z: 0.5 }));

    //head
    duck.add(createRectangle({ x: 3, z: 1 }, { color1: color }, { x: 0, y: 4, z: 2 }));
    duck.add(createRing({ x: 3, y: 1, z: 3 }, { color1: color }, { x: 0, y: 3, z: 2 }));

    //eyes
    duck.add(createBlock("wool_colored_black", { x: -1, y: 4, z: 3 }));
    duck.add(createBlock(color, { x: 0, y: 4, z: 3 }));
    duck.add(createBlock("wool_colored_black", { x: 1, y: 4, z: 3 }));

    //beak
    duck.add(createRectangle({ x: 3, z: 1 }, { color1: "wool_colored_orange" }, { x: 0, y: 3, z: 4 }));

    //feet
    feet.add(createRectangle({ x: 1, z: 2 }, { color1: "wool_colored_orange" }, { x: -1, y: 0, z: 0.5 }));
    feet.add(createRectangle({ x: 1, z: 2 }, { color1: "wool_colored_orange" }, { x: 1, y: 0, z: 0.5 }));
    duck.add(feet);

    //wings
    duck.add(createRing({ x: 1, y: 1, z: 3 }, { color1: color }, { x: -2, y: 2, z: 0 }));
    duck.add(createRing({ x: 1, y: 1, z: 3 }, { color1: color }, { x: 2, y: 2, z: 0 }));

    if (wings) {
        duck.add(createRing({ x: 1, y: 1, z: 2 }, { color1: color }, { x: -3, y: 2, z: -0.5 }));
        duck.add(createRing({ x: 1, y: 1, z: 2 }, { color1: color }, { x: 3, y: 2, z: -0.5 }));
    }

    if (center) {
        duck.position.set(0, -2, -1);
    }

    duck.position.add(position);
    return duck;
}

function createPig(color, position) {
    idColor = getBlockPosition(color);
    let pig = new THREE.Object3D();
    pig.add(createRing({ x: 3, y: 1, z: 7 }, { color1: color }, { x: 0, y: 2, z: 0 }));
    pig.add(createRectangle({ x: 3, z: 7 }, { color1: color }, { x: 0, y: 3, z: 1 }));
    pig.add(createRectangle({ x: 3, z: 7 }, { color1: color }, { x: 0, y: 1, z: 0 }));

    //face
    pig.add(createBlock("wool_colored_black", { x: -1, y: 2, z: 4 }));
    pig.add(createBlock(color, { x: 0, y: 2, z: 4 }));
    pig.add(createBlock("wool_colored_black", { x: 1, y: 2, z: 4 }));
    pig.add(createBlock(color, { x: -1, y: 1, z: 4 }));
    pig.add(createBlock("wool_colored_pink", { x: 0, y: 1, z: 4 }));
    pig.add(createBlock(color, { x: 1, y: 1, z: 4 }));

    //tail
    pig.add(createBlock("wool_colored_pink", { x: 0, y: 3, z: -3 }));
    pig.add(createBlock("wool_colored_pink", { x: -1, y: 2, z: -4 }));
    pig.add(createBlock("wool_colored_pink", { x: 0, y: 2, z: -4 }));

    //feet
    pig.add(createRing({ x: 1, y: 1, z: 2 }, { color1: "wool_colored_pink" }, { x: 1, y: 0, z: 2.5 }));
    pig.add(createRing({ x: 1, y: 1, z: 2 }, { color1: "wool_colored_pink" }, { x: 1, y: 0, z: -1.5 }));
    pig.add(createRing({ x: 1, y: 1, z: 2 }, { color1: "wool_colored_pink" }, { x: -1, y: 0, z: 2.5 }));
    pig.add(createRing({ x: 1, y: 1, z: 2 }, { color1: "wool_colored_pink" }, { x: -1, y: 0, z: -1.5 }));

    //ears
    pig.add(createBlock("wool_colored_pink", { x: -2, y: 3, z: 3 }));
    pig.add(createBlock("wool_colored_pink", { x: 2, y: 3, z: 3 }));

    pig.position.set(position.x, position.y, position.z);
    return pig;
}

function createCow(colorData, position) {
    idColor1 = getBlockPosition(colorData.color1);
    idColor2 = getBlockPosition(colorData.color2);
    variance = colorData.variance;
    let cow = new THREE.Object3D();

    //body
    cow.add(createRectangle({ x: 3, z: 7 }, { color1: colorData.color1 }, { x: 0, y: 2, z: 0 }));
    cow.add(createRing({ x: 5, y: 1, z: 9 }, colorData, { x: 0, y: 3, z: 0 }));
    cow.add(createRing({ x: 5, y: 2, z: 9 }, colorData, { x: 0, y: 4, z: 0 }));
    cow.add(createRectangle({ x: 3, z: 7 }, colorData, { x: 0, y: 6, z: 0 }));
    cow.add(createRectangle({ x: 3, z: 3 }, { color1: colorData.color1 }, { x: 0, y: 6, z: 5 }));

    //face
    cow.add(createRectangle({ x: 3, z: 1 }, { color1: colorData.color1 }, { x: 0, y: 4, z: 5 }));
    cow.add(createRectangle({ x: 3, z: 1 }, { color1: colorData.color1 }, { x: 0, y: 5, z: 5 }));
    cow.add(createBlock("wool_colored_black", { x: 1, y: 5, z: 6 }));
    cow.add(createBlock(colorData.color1, { x: 0, y: 5, z: 6 }));
    cow.add(createBlock("wool_colored_black", { x: -1, y: 5, z: 6 }));
    cow.add(createBlock(colorData.color1, { x: 1, y: 4, z: 6 }));
    cow.add(createBlock(colorData.color1, { x: -1, y: 4, z: 6 }));
    cow.add(createBlock(colorData.color2, { x: 0, y: 4, z: 6 }));

    //ears
    cow.add(createBlock("wool_colored_black", { x: 2, y: 6, z: 5 }));
    cow.add(createBlock("wool_colored_black", { x: -2, y: 6, z: 5 }));

    //feet
    cow.add(createRing({ x: 1, y: 3, z: 1 }, { color1: colorData.color1 }, { x: -2, y: 0, z: -4 }));
    cow.add(createRing({ x: 1, y: 3, z: 1 }, { color1: colorData.color1 }, { x: 2, y: 0, z: -4 }));
    cow.add(createRing({ x: 1, y: 3, z: 1 }, { color1: colorData.color1 }, { x: -2, y: 0, z: 4 }));
    cow.add(createRing({ x: 1, y: 3, z: 1 }, { color1: colorData.color1 }, { x: 2, y: 0, z: 4 }));

    //tail
    cow.add(createRing({ x: 1, y: 2, z: 1 }, { color1: colorData.color1 }, { x: 0, y: 4, z: -5 }));
    cow.add(createRing({ x: 1, y: 4, z: 1 }, { color1: colorData.color1 }, { x: 0, y: 1, z: -6 }));

    cow.position.set(position.x, position.y, position.z);
    return cow;
}
