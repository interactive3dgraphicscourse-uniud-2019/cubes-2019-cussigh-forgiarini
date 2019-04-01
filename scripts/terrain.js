function getHeightData(img, scale) {

    if (scale == undefined) scale = 1;

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext('2d');

    var size = img.width * img.height;
    console.log(size);
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    for (var i = 0; i < size; i++) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var all = pix[i] + pix[i + 1] + pix[i + 2];  // all is in range 0 - 255*3
        data[j++] = scale * all / 3;
    }

    return data;
}


/**
 * returns terrain
 */
function createTerrain() {

    // terrain
    let terrain = new THREE.Object3D();
    let faketerrain = new THREE.Object3D();
    let block = new THREE.Object3D();


    var img = new Image();
    img.src = "heightMap/heightmap3.png";



    img.onload = function () {

        let sizeX = img.height;
        let sizeY = 40;
        let sizeZ = img.width;
        console.log(sizeZ);

        terrainMatrix = [];
        for (let i = 0; i < sizeX; i++) {
            terrainMatrix[i] = [];
            for (let j = 0; j < sizeY; j++) {
                terrainMatrix[i][j] = [];
                for (let k = 0; k < sizeZ; k++) {
                    terrainMatrix[i][j][k] = null;
                }
            }
        }

        console.log(terrainMatrix);
        //get height data from img
        var data = getHeightData(img, 0.1);
        console.log(data);

        //converts data matrix in int of wished range 
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.floor(mapValues(data[i], 1, 63.75, 0, sizeY - 1));
            if (data[i] < 0) data[i] = 0;
        }

        // creates bidimensional matrix heightsMatrix
        let heightsMatrix = [];
        for (let i = sizeX-1; i >=0; i--) {
            heightsMatrix[i] = [];
            for (let j = 0; j < sizeY; j++) {
                heightsMatrix[i][j] = 0;
                
            }
        }

        //add blocks to the terrainMatrix and fills heightsMatrix 
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeZ; j++) {
                terrainMatrix[sizeX - i - 1][data[(i * sizeZ) + j]][j] = createBlock(
                    "wool_colored_test",
                    { x: sizeX - i - 1, y: data[(i * sizeZ) + j], z: j }
                );
                heightsMatrix[sizeX - i - 1][j] = data[(i * sizeZ) + j];
            }
        }

        //add blocks of the matrix to the terrain object
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                for (let k = 0; k < sizeZ; k++) {
                    if (terrainMatrix[i][j][k] !== null) terrain.add(terrainMatrix[i][j][k]);
                }
            }
        }

        //fills the gaps where terrain is misaligned, checking the lowest height neighbour of each block
        let altezza, a1, a2, a3, a4;
            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeZ; j++) {
                    altezza = heightsMatrix[i][j];
                    if (inBound2(i+1,j,sizeX-1,sizeZ-1)) a1 = heightsMatrix[i+1][j];
                    else a1 = sizeY +1;
 
                    if (inBound2(i-1,j,sizeX-1,sizeZ-1)) a2 = heightsMatrix[i-1][j];
                    else a2 = sizeY +1;

                    if (inBound2(i,j+1,sizeX-1,sizeZ-1)) a3 = heightsMatrix[i][j+1];
                    else a3 = sizeY +1;

                    if (inBound2(i,j-1,sizeX-1,sizeZ-1)) a4 = heightsMatrix[i][j-1];
                    else a4 = sizeY +1;

                    minNeigh = Math.min(a1,a2,a3,a4);
                   if (minNeigh < altezza-1) {
                       for (let h=0; h<altezza-minNeigh-1;h++) {
                           terrain.add(createBlock(
                            "wool_colored_test",
                            { x:i, y: altezza - h -1, z: j }
                        ));
                       }
                   }
                }
            }


 

    }

    return terrain;
}






