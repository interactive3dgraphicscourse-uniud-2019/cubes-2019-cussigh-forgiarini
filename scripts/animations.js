let sphereRotations;
let simpleRotations;
let movingOBJInsideContainers;
let lineAnimations;
let oldTimeAnimations;

function initAnimations() {
    sphereRotations = [];
    simpleRotations = [];
    movingOBJInsideContainers = [];
    lineAnimations = [];
    oldTimeAnimations = Date.now();
}

function addSimpleRotation(rotationVector, object3D, time) {
    simpleRotations.push({
        rotationVector: rotationVector,
        object3D: object3D,
        rotationTime: time
    });
}

let milliseconds_elapsed;
let time_elapsed;

function enableAnimations() {
    moveWorld = true;
    start_time = Date.now();
}

function animateWorld() {
    milliseconds_elapsed = Date.now() - start_time;
    time_elapsed = milliseconds_elapsed - oldTimeAnimations;

    if (moveWorld && time_elapsed > 0) {

        // sphere animations
        for (let i = 0; i < sphereRotations.length; i++) {

            // rotate object inside sphere
            let angle = time_elapsed / sphereRotations[i].rotationTime * 2 * Math.PI;
            sphereRotations[i].container.rotateOnAxis(sphereRotations[i].rotationVector, -angle);

            // applying sin movement
            if (sphereRotations[i].sinMovement) {
                sphereRotations[i].sinCurrentValue += time_elapsed / sphereRotations[i].sinTime * 2 * Math.PI;

                let sinVector = new THREE.Vector3(
                    0,
                    Math.sin(sphereRotations[i].sinCurrentValue) * sphereRotations[i].sinMultiplier,
                    0
                );

                sinVector.applyAxisAngle(X_AXIS, -sphereRotations[i].angleX);
                sinVector.applyAxisAngle(Z_AXIS, -sphereRotations[i].angleZ);

                sphereRotations[i].wrapper.position.set(
                    sphereRotations[i].spherePosition.x + sinVector.x,
                    sphereRotations[i].spherePosition.y + sinVector.y,
                    sphereRotations[i].spherePosition.z + sinVector.z
                );
            }
        }

        for (let i = 0; i < simpleRotations.length; i++) {
            let angle = time_elapsed / simpleRotations[i].rotationTime * 2 * Math.PI;
            simpleRotations[i].object3D.rotateOnAxis(simpleRotations[i].rotationVector, angle);
        }

        for (let i = 0; i < movingOBJInsideContainers.length; i++) {
            let obj = movingOBJInsideContainers[i].object3D;
            let containerData = movingOBJInsideContainers[i].containerData;
            let collisionFix = movingOBJInsideContainers[i].collisionFix;
            let direction = movingOBJInsideContainers[i].directionVector;
            let speed = movingOBJInsideContainers[i].speed;

            // checking if object is out of bounds
            // right wall
            if (direction.x > 0 && (obj.position.x > containerData.position.x + containerData.dimensions.x / 2 - collisionFix)) {
                let oldDirection = direction.clone();
                let wallAngle = Math.acos(oldDirection.x);
                movingOBJInsideContainers[i].directionVector.x = -Math.cos(wallAngle);
                let angle = oldDirection.angleTo(movingOBJInsideContainers[i].directionVector);
                if (movingOBJInsideContainers[i].directionVector.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }
            // left wall
            if (direction.x < 0 && (obj.position.x < containerData.position.x - containerData.dimensions.x / 2 + collisionFix)) {
                let oldDirection = direction.clone();
                let wallAngle = Math.acos(oldDirection.x);
                movingOBJInsideContainers[i].directionVector.x = -Math.cos(wallAngle);
                let angle = oldDirection.angleTo(movingOBJInsideContainers[i].directionVector);
                if (movingOBJInsideContainers[i].directionVector.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            // top wall
            if (direction.z > 0 && (obj.position.z > containerData.position.z + containerData.dimensions.z / 2 - collisionFix)) {
                let oldDirection = direction.clone();
                let wallAngle = Math.asin(oldDirection.z);
                movingOBJInsideContainers[i].directionVector.z = -Math.sin(wallAngle);
                let angle = oldDirection.angleTo(movingOBJInsideContainers[i].directionVector);
                if (movingOBJInsideContainers[i].directionVector.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            // bottom wall
            if (direction.z < 0 && (obj.position.z < containerData.position.z - containerData.dimensions.z / 2 + collisionFix)) {
                let oldDirection = direction.clone();
                let wallAngle = Math.asin(oldDirection.z);
                movingOBJInsideContainers[i].directionVector.z = -Math.sin(wallAngle);
                let angle = oldDirection.angleTo(movingOBJInsideContainers[i].directionVector);
                if (movingOBJInsideContainers[i].directionVector.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }

            // moving object
            let positionVector = new THREE.Vector3(
                direction.x * speed * time_elapsed / 1000,
                direction.y,
                direction.z * speed * time_elapsed / 1000
            );
            obj.position.add(positionVector);
        }

        for(let i=0; i<lineAnimations.length; i++){
            ;
        }
    }
    oldTimeAnimations = milliseconds_elapsed;
}

/**
 * Takes an object3D and add to him a rotation animation inside a sphere.
 * 
 * @param {Object} data Data for the function
 * @param {Object} data.objectToAnimate THREE.Object3D to animate
 * @param {Object} data.spherePosition position of center of sphere
 * @param {Number} data.radius radius of rotation
 * @param {Object} data.rotationVector vector indicating the ortogonal plane of rotation
 * @param {Boolean} data.sinMovement flag to enable sin vertical movevement
 * @param {Number} data.rotationTime milliseconds to complete one rotation
 * @param {Number} data.sinTime milliseconds to complete sin cicle
 * @param {Number} data.sinMultiplier multiplier for sin height
 */

function createCicleSphereAnimation(data) {
    let objectToAnimate = data.objectToAnimate;
    let spherePosition = data.spherePosition;
    let rotationVector = data.rotationVector;
    let radius = data.radius;

    let radiusWrapper = new THREE.Object3D();
    radiusWrapper.add(objectToAnimate);
    radiusWrapper.position.set(radius, 0, 0);

    let objectToAnimateWrapper = new THREE.Object3D();
    objectToAnimateWrapper.add(radiusWrapper);

    let vectorX = new THREE.Vector3(0, rotationVector.y, rotationVector.z);
    let angleX;
    if (vectorX.x == 0 && vectorX.y == 0 && vectorX.z == 0) {
        angleX = 0;
    } else {
        angleX = Y_AXIS.angleTo(vectorX);
    }

    let vectorZ = new THREE.Vector3(rotationVector.x, rotationVector.y, 0);
    let angleZ;
    if (vectorZ.x == 0 && vectorZ.y == 0 && vectorZ.z == 0) {
        angleZ = 0;
    } else {
        angleZ = Y_AXIS.angleTo(vectorZ);
    }

    objectToAnimateWrapper.rotateOnAxis(X_AXIS, -angleX);
    objectToAnimateWrapper.rotateOnAxis(Z_AXIS, -angleZ);

    let rotationWrapper = new THREE.Object3D();
    rotationWrapper.add(objectToAnimateWrapper);

    let animationWrapper = new THREE.Object3D();
    animationWrapper.add(rotationWrapper);

    animationWrapper.position.set(
        spherePosition.x,
        spherePosition.y,
        spherePosition.z
    );

    sphereRotations.push({
        wrapper: animationWrapper,
        container: rotationWrapper,
        rotationVector: rotationVector.normalize(),
        spherePosition: spherePosition,
        sinMovement: data.sinMovement,
        radius: radius,
        angleX: angleX,
        angleZ: angleZ,
        rotationTime: data.rotationTime,
        sinTime: data.sinTime,
        sinMultiplier: data.sinMultiplier,
        sinCurrentValue: 0
    });
    return animationWrapper;
}

function moveObjectInsideContainer(data) {
    let object3D = data.obj;
    let bounderies = data.bounderies;
    let fixBounderies = data.fixBounderies;
    let directionVector = data.directionVector;
    let speed = data.speed;

    object3D.rotateOnAxis(Y_AXIS, Z_AXIS.angleTo(directionVector));
    movingOBJInsideContainers.push({
        object3D: object3D,
        containerData: bounderies,
        directionVector: directionVector,
        speed: speed,
        collisionFix: fixBounderies
    });
}
/**
 * Takes an object3D and add to him a line animation from point A to point B.
 * 
 * @param {Object} data Data for the function
 * @param {Object} data.from THREE.Object3D to animate
 * @param {Object} data.to position of center of sphere
 * @param {Number} data.speed radius of rotation
 * @param {Object} data.cosMovement vector indicating the ortogonal plane of rotation
 * @param {Boolean} data.cosTime flag to enable sin vertical movevement
 * @param {Number} data.cosMultiplier multiplier for sin height
 */

function createLineAnimation(data) {

    lineAnimations.push({

    });
}