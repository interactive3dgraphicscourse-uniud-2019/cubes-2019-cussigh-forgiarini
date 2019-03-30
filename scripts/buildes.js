
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