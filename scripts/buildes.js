
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
    console.log(depth);
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