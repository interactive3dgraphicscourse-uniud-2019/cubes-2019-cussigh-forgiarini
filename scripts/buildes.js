
function createHouse(data) {

    let width = data.width;
    let height = data.height;
    let depth = data.depth;
    let roofHeight = data.roofHeight;
    let windowsNumber = data.windowsNumber;
    let chimney = data.chimney;

    let house = new THREE.Object3D();

    let floor = new THREE.Object3D();
    let i, j, k;
    for (i = 0; i < width; i++) {
        for (j = 0; j < depth; j++) {
            let obj = new THREE.Object3D();
            obj.add(availableCubes[0].cube.clone());
            obj.position.set(i - width / 2 + 0.5, 0, j - depth / 2 + 0.5);
            floor.add(obj);
        }
    }
    floor.position.set(0, 0, 0);
    house.add(floor);
    return house;
}

/**
 * Create a stable using passed data.
 * 
 * @param {Object} data             Data to use
 * @param {Number} data.width       value of width
 * @param {Number} data.height      value of height
 * @param {Number} data.depth       value of depth
 * @param {Object} data.colors           color names of the roof
 * @param {String} data.colors.color1    color1
 * @param {String} data.colors.color2    color2
 * @param {Object} data.position    3VECTOR of the position of the stable
  */
function createStable(data) {
    let width = data.width;
    let height = data.height;
    let depth = data.depth;
    let position = data.position;
    let color1 = data.colors.color1;
    let color2 = data.colors.color2;
    let stable = new THREE.Object3D();
    let roofHeight = height -4;
    let columnColor = "wool_colored_brown"
    
    stable.add(createRoof({width:width, depth:depth, colors:{color1:color1, color2:color2}, position:{x:0,y:roofHeight,z:0}}));

    if(depth%2 !=0){
        stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:-width/2 + 0.5 +1,y:0,z:0}));
        stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:width/2 - 0.5 -1,y:0,z:0}));
        for (let i=0; i<Math.floor((depth-3)/2/2); i++) {
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:width/2 - 0.5 -1,y:0,z:i*2+2}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:-width/2 + 0.5+1,y:0,z:i*2+2}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:width/2 - 0.5 -1,y:0,z:-i*2-2}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:-width/2 + 0.5+1,y:0,z:-i*2-2}));
        }
    }
    else {
        for (let i=0; i<=Math.floor((depth-3)/2/2); i++) {
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:width/2 - 0.5 -1,y:0,z:i*2+1}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:-width/2 + 0.5+1,y:0,z:i*2+1}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:width/2 - 0.5 -1,y:0,z:-i*2-1}));
            stable.add(createRing({x:1,y:roofHeight+1,z:1}, {color1:columnColor}, {x:-width/2 + 0.5+1,y:0,z:-i*2-1}));
        }
    }
    
  
    stable.position.set(position.x,position.y,position.z);
    return stable;
}


/**
 * Create a rounded roof using passed data of height 4.
 * 
 * @param {Object} data                  Data to use
 * @param {Number} data.width            value of width
 * @param {Number} data.depth            value of depth
 * @param {Object} data.colors           color names of the roof
 * @param {String} data.colors.color1    color1
 * @param {String} data.colors.color2    color2
 * @param {Object} data.position         3VECTOR of the position of the stable
  */
function createRoof(data) {

    let width = data.width;
    let depth = data.depth;
    let color1 = data.colors.color1;
    let color2 = data.colors.color2;
    let position = data.position;
    let roof = new THREE.Object3D();

    let fix = 0.5;
    //curve
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color1}, {x:width/2 - fix,y:0,z:0}));
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color1}, {x:-width/2 + fix,y:0,z:0}));
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color2}, {x:width/2-1 - fix,y:1,z:0}));
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color2}, {x:-width/2+1 + fix,y:1,z:0}));
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color1}, {x:width/2-2 - fix,y:2,z:0}));
    roof.add(createRing({x:1,y:1,z:depth}, {color1:color1}, {x:-width/2+2 +fix,y:2,z:0}));

    let spaceLeft = width - 6;
    roof.add(createRectangle({x:spaceLeft,y:1,z:depth}, {color1:color2}, {x:0,y:3,z:0}));


    roof.position.set(position.x,position.y, position.z);
    return roof;
}


function createWindmill(data) {
    let width = data.width;
    let height = data.height;
    let depth = data.depth;
    let position = data.position;
    let colors = data.colors;

    let windmill = new THREE.Object3D();
    let capHeight = 3;
    let capWidth = width - 4;
    let capDepth = depth - 4;
    let columnHeight = height-2 - capHeight;

    //base
    windmill.add(createRing({x:width,y:1,z:depth}, {color1:colors.color2}, {x:0, y:0,z:0}));
    windmill.add(createRing({x:width-2,y:1,z:depth-2}, {color1:colors.color2}, {x:0, y:1,z:0}));
    
    //column
    windmill.add(createRing(
        {x:width-4,y:columnHeight,z:depth-4}, 
        {color1:colors.color1,color2:colors.color2, variance:2 }, 
        {x:0, y:2,z:0}
    ));

    //cap
    for (let i=0; i<capHeight; i++){
        windmill.add(createRing({x:capWidth,y:1,z:capDepth}, {color1:colors.color1}, {x:0, y:height- capHeight +i,z:0}));
        capWidth--;
        capDepth--;
    }
    if(capWidth>1 && capDepth>1) {
        windmill.add(createRectangle({x:capWidth,y:1,z:capDepth}, {color1:colors.color1}, {x:0, y:height,z:0}));
    }

    //blades
    let blades = new THREE.Object3D();
    let bladeDepth = Math.floor((depth - 4)/2);
    if (bladeDepth%2==0) bladeDepth--;
    let bladeHeight = Math.floor(columnHeight/2);
    let blade1 = new THREE.Object3D();

    blade1.add(createRing(
        {x:1, y:bladeHeight, z:bladeDepth},
        {color1:colors.color2},
        {x:width/2-2.5+2, y:Math.ceil(bladeDepth/2),z:0
    } ));
    blade1.add (createRing(
        {x:1, y:bladeDepth/2, z:1},
        {color1:colors.color2},
        {x:width/2-2.5+2, y:1,z:0
    } ));
    blade2 = blade1.clone();
    blade2.rotation.set(-Math.PI/2,0,0);
    blade3 = blade1.clone();
    blade3.rotation.set(+Math.PI/2,0,0);
    blade4 = blade1.clone();
    blade4.rotation.set(+Math.PI,0,0);
    
    blades.add(blade1);
    blades.add(blade2);
    blades.add(blade3);
    blades.add(blade4);

    blades.add(createRing(
        {x:2, y:1, z:1},
        {color1:"wool_colored_white"},
        {x:width/2-1, y:0,z:0
    } ));
    addSimpleRotation(new THREE.Vector3(1, 0, 0), blades, 5000);
    
    let bladesContainer = new THREE.Object3D();
    bladesContainer.add(blades);
    bladesContainer.position.set(0,columnHeight ,0)
    
    windmill.add(bladesContainer);
    windmill.position.set(position.x,position.y, position.z);

    return windmill;
}