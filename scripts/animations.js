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
            let angle =
                (time_elapsed / sphereRotations[i].rotationTime) * 2 * Math.PI;
            sphereRotations[i].container.rotateOnAxis(
                sphereRotations[i].rotationVector,
                -angle
            );

            // applying sin movement
            if (sphereRotations[i].sinMovement) {
                sphereRotations[i].sinCurrentValue +=
                    (time_elapsed / sphereRotations[i].sinTime) * 2 * Math.PI;

                let sinVector = new THREE.Vector3(
                    0,
                    Math.sin(sphereRotations[i].sinCurrentValue) *
                    sphereRotations[i].sinMultiplier,
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
            let angle =
                (time_elapsed / simpleRotations[i].rotationTime) * 2 * Math.PI;
            simpleRotations[i].object3D.rotateOnAxis(
                simpleRotations[i].rotationVector,
                angle
            );
        }

        for (let i = 0; i < movingOBJInsideContainers.length; i++) {
            let obj = movingOBJInsideContainers[i].object3D;
            let containerData = movingOBJInsideContainers[i].containerData;
            let collisionFix = movingOBJInsideContainers[i].collisionFix;
            let direction = movingOBJInsideContainers[i].directionVector;
            let speed = movingOBJInsideContainers[i].speed;

            // checking if object is out of bounds
            // right wall
            if (
                direction.x > 0 &&
                obj.position.x >
                containerData.position.x +
                containerData.dimensions.x / 2 -
                collisionFix
            ) {
                let oldDirection = direction.clone();
                let wallAngle = Math.acos(oldDirection.x);
                movingOBJInsideContainers[i].directionVector.x = -Math.cos(wallAngle);
                let angle = oldDirection.angleTo(
                    movingOBJInsideContainers[i].directionVector
                );
                if (movingOBJInsideContainers[i].directionVector.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }
            // left wall
            if (
                direction.x < 0 &&
                obj.position.x <
                containerData.position.x -
                containerData.dimensions.x / 2 +
                collisionFix
            ) {
                let oldDirection = direction.clone();
                let wallAngle = Math.acos(oldDirection.x);
                movingOBJInsideContainers[i].directionVector.x = -Math.cos(wallAngle);
                let angle = oldDirection.angleTo(
                    movingOBJInsideContainers[i].directionVector
                );
                if (movingOBJInsideContainers[i].directionVector.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            // top wall
            if (
                direction.z > 0 &&
                obj.position.z >
                containerData.position.z +
                containerData.dimensions.z / 2 -
                collisionFix
            ) {
                let oldDirection = direction.clone();
                let wallAngle = Math.asin(oldDirection.z);
                movingOBJInsideContainers[i].directionVector.z = -Math.sin(wallAngle);
                let angle = oldDirection.angleTo(
                    movingOBJInsideContainers[i].directionVector
                );
                if (movingOBJInsideContainers[i].directionVector.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            // bottom wall
            if (
                direction.z < 0 &&
                obj.position.z <
                containerData.position.z -
                containerData.dimensions.z / 2 +
                collisionFix
            ) {
                let oldDirection = direction.clone();
                let wallAngle = Math.asin(oldDirection.z);
                movingOBJInsideContainers[i].directionVector.z = -Math.sin(wallAngle);
                let angle = oldDirection.angleTo(
                    movingOBJInsideContainers[i].directionVector
                );
                if (movingOBJInsideContainers[i].directionVector.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }

            // moving object
            let positionVector = new THREE.Vector3(
                (movingOBJInsideContainers[i].directionVector.x *
                    speed *
                    time_elapsed) /
                1000,
                movingOBJInsideContainers[i].directionVector.y,
                (movingOBJInsideContainers[i].directionVector.z *
                    speed *
                    time_elapsed) /
                1000
            );
            obj.position.add(positionVector);
        }
        for (let i = 0; i < lineAnimations.length; i++) {
            if (!lineAnimations[i].endedTrip) {
                let obj = lineAnimations[i].obj3D;
                let nextPointIndex;
                if (lineAnimations[i].currentStartPoint == lineAnimations[i].tripPoints.length - 1) {
                    nextPointIndex = 0;
                } else {
                    nextPointIndex = lineAnimations[i].currentStartPoint + 1;
                }

                if (!isOBJMovingTo(
                    obj.position,
                    lineAnimations[i].direction,
                    lineAnimations[i].tripPoints[nextPointIndex])
                ) {
                    if (nextPointIndex + 1 == lineAnimations[i].tripPoints.length) {
                        if (!lineAnimations[i].bounce) {
                            lineAnimations[i].endedTrip = true;
                        }
                    }
                    lineAnimations[i].currentStartPoint = nextPointIndex;

                    let nextTripPoint;
                    if (nextPointIndex == lineAnimations[i].tripPoints.length - 1) {
                        nextTripPoint = lineAnimations[i].tripPoints[0];
                    } else {
                        nextTripPoint = lineAnimations[i].tripPoints[nextPointIndex + 1];
                    }
                    if(!lineAnimations[i].endedTrip){
                        obj.lookAt(nextTripPoint.x, nextTripPoint.y, nextTripPoint.z);
                    }

                    let direction = new THREE.Vector3(
                        nextTripPoint.x - obj.position.x,
                        nextTripPoint.y - obj.position.y,
                        nextTripPoint.z - obj.position.z
                    );
                    direction.normalize();
                    lineAnimations[i].direction = direction;
           
                    let distance = obj.position.distanceTo(nextTripPoint);
                    let tempoTot = distance/lineAnimations[i].speed*1000;
                    lineAnimations[i].cosTime = Math.round(tempoTot / lineAnimations[i].cosCicles);
                    lineAnimations[i].cosAngleRotate = X_AXIS.angleTo(lineAnimations[i].direction);
                    lineAnimations[i].cosCurrentValue = 0;
                }

                if (!lineAnimations[i].endedTrip) {

                    obj.position.add(
                        lineAnimations[i].direction
                            .clone()
                            .multiplyScalar((lineAnimations[i].speed * time_elapsed) / 1000)
                    );
                }

                // applying cos movement
                if (lineAnimations[i].cosMovement && !lineAnimations[i].endedTrip) {
                    lineAnimations[i].cosCurrentValue +=
                        (time_elapsed / lineAnimations[i].cosTime) * 2 * Math.PI;

                    let cosVector = new THREE.Vector3(
                        0,
                        0,
                        Math.cos(lineAnimations[i].cosCurrentValue) *
                        lineAnimations[i].cosMultiplier
                    );

                    if (lineAnimations[i].direction.z < 0) {
                        cosVector.applyAxisAngle(Y_AXIS, lineAnimations[i].cosAngleRotate);
                    } else {
                        cosVector.applyAxisAngle(Y_AXIS, -lineAnimations[i].cosAngleRotate);
                    }
                    lineAnimations[i].container.position.add(cosVector);
                }
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
 * Takes an object3D and add to him a line animation for a trip following points passed via parameter.
 * Assumes object is creating looking at 0,0,1.
 * Object will look where it is going.
 *
 * @param {Object} data Data for the function
 * @param {Object} data.objectToAnimate THREE.Object3D to animate
 * @param {Array} data.tripPoints Array of THREE.Vector3 points of trip
 * @param {Boolean} data.bounce true if obj has to restart trip, false otherwise
 * @param {Number} data.speed speed of object (units/s)
 * @param {Number} data.cosCicles number of cos cicles from point A to point B
 * @param {Boolean} data.cosMovement flag to enable cos horizontal movement
 * @param {Number} data.cosMultiplier multiplier for cos movement
 * @returns {Object} THREE.Object3D container of animation
 */
function createLineAnimation(data) {
    let container = new THREE.Object3D();
    let obj3D = data.objectToAnimate;
    let trip = data.tripPoints;
    let startPoint = trip[0];
    let nextPoint = trip[1];

    let direction = new THREE.Vector3(
        nextPoint.x - startPoint.x,
        nextPoint.y - startPoint.y,
        nextPoint.z - startPoint.z
    );
    direction.normalize();

    obj3D.position.set(
        startPoint.x,
        startPoint.y,
        startPoint.z
    );

    obj3D.lookAt(nextPoint.x, nextPoint.y, nextPoint.z);
    
    let distance = obj3D.position.distanceTo(nextPoint);
    let tempoTot = distance/data.speed*1000;
    let cosTime = Math.round(tempoTot / data.cosCicles);
    let cosAngleRotate = X_AXIS.angleTo(direction);

    let dataANIMATION = {
        obj3D: obj3D,
        tripPoints: trip,
        bounce: data.bounce,
        speed: data.speed,
        direction: direction,
        cosMovement: data.cosMovement,
        cosTime: cosTime,
        cosMultiplier: data.cosMultiplier,
        cosCurrentValue: 0,
        container: container,
        currentStartPoint: 0,
        endedTrip: false,
        cosCicles: data.cosCicles,
        cosAngleRotate: cosAngleRotate
    };
    lineAnimations.push(dataANIMATION);
    container.add(obj3D);

    return container;
}
