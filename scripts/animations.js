let sphereRotations;
let simpleRotations;
let movingOBJInsideContainers;
let lineAnimations;
let start_time;

function initAnimations() {
    sphereRotations = [];
    simpleRotations = [];
    movingOBJInsideContainers = [];
    lineAnimations = [];
    moveWorld = false;
}

let milliseconds_elapsed;
let oldTimeAnimations;
let time_elapsed;

function enableAnimations() {
    moveWorld = true;
    start_time = Date.now();
    oldTimeAnimations = Date.now();
}

/**
 * Executes animations in world.
 */

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
                movingOBJInsideContainers[i].directionVector.x * speed * time_elapsed / 1000,
                movingOBJInsideContainers[i].directionVector.y,
                movingOBJInsideContainers[i].directionVector.z * speed * time_elapsed / 1000
            );
            obj.position.add(positionVector);
        }
        for (let i = 0; i < lineAnimations.length; i++) {
            let obj = lineAnimations[i].obj3D;
            // if both conditions are true, it means that object is going away from the two points, so it has to come back
            if (!isOBJMovingTo(obj.position, lineAnimations[i].direction, lineAnimations[i].from) &&
                !isOBJMovingTo(obj.position, lineAnimations[i].direction, lineAnimations[i].to)) {
                    console.log("Bounce");
                if (lineAnimations[i].bounce) {
                    lineAnimations[i].direction.multiplyScalar(-1);
                    obj.rotateOnAxis(lineAnimations[i].rotationAxis, Math.PI);
                } else {
                    lineAnimations[i].direction.multiplyScalar(0);
                }
            }

            //passed from point
            obj.position.add(
                lineAnimations[i].direction.clone().multiplyScalar(
                    lineAnimations[i].speed * time_elapsed / 1000
                )
            );

            // applying cos movement
            if (lineAnimations[i].cosMovement) {
                lineAnimations[i].cosCurrentValue += time_elapsed / lineAnimations[i].cosTime * 2 * Math.PI;

                let cosVector = new THREE.Vector3(
                    0,
                    0,
                    Math.cos(lineAnimations[i].cosCurrentValue) * lineAnimations[i].cosMultiplier,
                );

                cosVector.applyAxisAngle(X_AXIS, -lineAnimations[i].angleX);
                cosVector.applyAxisAngle(Z_AXIS, -lineAnimations[i].angleZ);

                lineAnimations[i].wrapper.position.set(
                    lineAnimations[i].spherePosition.x + cosVector.x,
                    lineAnimations[i].spherePosition.y + cosVector.y,
                    lineAnimations[i].spherePosition.z + cosVector.z
                );
            }
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
 * @returns {Object} THREE.Object3D container of animation
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
    if (isNullVector(vectorX)) {
        angleX = 0;
    } else {
        angleX = Y_AXIS.angleTo(vectorX);
    }

    let vectorZ = new THREE.Vector3(rotationVector.x, rotationVector.y, 0);
    let angleZ;
    if (isNullVector(vectorZ)) {
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

/**
 * Add a rotation animation of an object around an axis passed.
 * 
 * @param {Object} rotationVector 3d vector to which object has to rotate
 * @param {Object} object3D Object to animate
 * @param {Number} time time of revolution around vector
 */
function addSimpleRotation(rotationVector, object3D, time) {
    simpleRotations.push({
        rotationVector: rotationVector,
        object3D: object3D,
        rotationTime: time
    });
}

/**
 * Add to passed object an animation inside a rectangle. Object will hit rectangle's walls and bounce with same angle.
 * 
 * @param {Object} data data for the function
 * @param {Object} data.obj THREE.Object3D to animate
 * @param {Object} data.bounderies 3d Vector of starting position
 * @param {Number} data.fixBounderies 3d Vector of ending position
 * @param {Object} data.directionVector 3d Vector for starting direction
 * @param {Number} data.speed speed of object (units/s)
 */
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
 * Assumes object is creating looking at 0,0,1.
 * Object will look where it is going, same as direction from A to B or B to A.
 * 
 * @param {Object} data Data for the function
 * @param {Boolean} data.startingPosition True if obj has to be in starting position, false if random in line
 * @param {Object} data.objectToAnimate THREE.Object3D to animate
 * @param {Object} data.from 3d Vector of starting position
 * @param {Object} data.to 3d Vector of ending position
 * @param {Boolean} data.bounce true if obj has to come back and bouncing, false otherwise
 * @param {Number} data.speed speed of object (units/s)
 * @param {Boolean} data.cosMovement flag to enable cos horizontal movement
 * @param {Number} data.cosTime time of sin period
 * @param {Number} data.cosMultiplier multiplier for cos movement
 * @returns {Object} THREE.Object3D container of animation
 */
function createLineAnimation(data) {
    let container = new THREE.Object3D();
    let obj3D = data.objectToAnimate;
    let fromPosition = data.from;
    let toPosition = data.to;

    let direction = new THREE.Vector3(
        toPosition.x - fromPosition.x,
        toPosition.y - fromPosition.y,
        toPosition.z - fromPosition.z
    );
    direction.normalize();

    if (!data.startingPosition) {
        let distance = fromPosition.distanceTo(toPosition);
        let randomMult = Math.random(0, Math.floor(distance));
        data.objectToAnimate.position.set(
            fromPosition.x + direction.x * randomMult,
            fromPosition.y + direction.y * randomMult,
            fromPosition.z + direction.z * randomMult);
    } else {
        data.objectToAnimate.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
    }
    console.log(direction);
    let vectorX = new THREE.Vector3(0, direction.y, direction.z);
    let angleX;
    if (isNullVector(vectorX)) {
        angleX = 0;
    } else {
        angleX = Z_AXIS.angleTo(vectorX);
    }

    let vectorY = new THREE.Vector3(direction.x, 0, direction.z);
    let angleY;
    if (isNullVector(vectorY)) {
        angleY = 0;
    } else {
        angleY = Z_AXIS.angleTo(vectorY);
    }
    console.log(angleX, angleY);
    let y_axis_clone = Y_AXIS.clone();
//    y_axis_clone.applyAxisAngle(X_AXIS, angleX);
//    y_axis_clone.applyAxisAngle(Z_AXIS, angleX);
    obj3D.rotateOnAxis(X_AXIS, angleX);
    obj3D.rotateOnAxis(Y_AXIS, angleY);
    let axisRotation= y_axis_clone;
    console.log(axisRotation);

    let dataANIMATION = {
        obj3D: obj3D,
        from: fromPosition,
        to: toPosition,
        bounce: data.bounce,
        speed: data.speed,
        direction: direction,
        cosMovement: data.cosMovement,
        cosTime: data.cosTime,
        cosMultiplier: data.cosMultiplier,
        cosCurrentValue: 0,
        container: container,
        rotationAxis: axisRotation
    };

    lineAnimations.push(dataANIMATION);
    container.add(obj3D);

    return container;
}