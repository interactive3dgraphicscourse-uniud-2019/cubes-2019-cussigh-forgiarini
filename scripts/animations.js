function animateWorld() {
    if (moveWorld) {

        let milliseconds_elapsed = Date.now() - start_time;

        cowWrapper.matrix.makeRotationAxis(new THREE.Vector3(0, 1, 0), mapValues(milliseconds_elapsed % 1000, 0, 999, 0, 2 * Math.PI));
        cowWrapper.matrixAutoUpdate = false;
    }
}