let sphereRotations;
let simpleRotations;
let movingOBJInsideContainers;

function initAnimations() {
    sphereRotations = [];
    simpleRotations = [];
    movingOBJInsideContainers = [];
}

function addSimpleRotation(rotationVector, object3D, time) {
    simpleRotations.push({
        rotationVector: rotationVector,
        object3D: object3D,
        rotationTime: time
    });
}

function animateWorld() {
    if (moveWorld) {
        let milliseconds_elapsed = Date.now() - start_time;

        // sphere animations
        for (let i = 0; i < sphereRotations.length; i++) {
            sphereRotations[i].container.matrix.makeRotationAxis(
                sphereRotations[i].rotationVector,
                mapValues(milliseconds_elapsed % sphereRotations[i].rotationTime, 0, sphereRotations[i].rotationTime - 1, 2 * Math.PI, 0)
            );
            sphereRotations[i].container.matrixAutoUpdate = false;

            if (sphereRotations[i].sinMovement) {
                let sinVector = new THREE.Vector3(
                    0,
                    Math.sin(
                        mapValues(milliseconds_elapsed % sphereRotations[i].sinTime, 0, sphereRotations[i].sinTime - 1, 0, 2 * Math.PI)
                    ) * sphereRotations[i].sinMultiplier,
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
            simpleRotations[i].object3D.matrix.makeRotationAxis(
                simpleRotations[i].rotationVector,
                mapValues(
                    milliseconds_elapsed % simpleRotations[i].rotationTime,
                    0,
                    simpleRotations[i].rotationTime - 1,
                    0,
                    2 * Math.PI
                )
            );
            simpleRotations[i].object3D.matrixAutoUpdate = false;
        }

        for (let i = 0; i < movingOBJInsideContainers.length; i++) {
            let obj = movingOBJInsideContainers[i].object3D;
            let velocity = movingOBJInsideContainers[i].velocity;
            let containerData = movingOBJInsideContainers[i].containerData;
            let collisionFix = movingOBJInsideContainers[i].collisionFix;

            obj.position.add(velocity);
            if (obj.position.x > containerData.position.x + containerData.dimensions.x / 2 - collisionFix) {
                let oldVelocity = velocity.clone();
                movingOBJInsideContainers[i].velocity.multiply(new THREE.Vector3(-1, 1, 1));
                let angle = oldVelocity.angleTo(movingOBJInsideContainers[i].velocity);
                if (movingOBJInsideContainers[i].velocity.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }
            if (obj.position.x < containerData.position.x - containerData.dimensions.x / 2 + collisionFix) {
                let oldVelocity = velocity.clone();
                movingOBJInsideContainers[i].velocity.multiply(new THREE.Vector3(-1, 1, 1));
                let angle = oldVelocity.angleTo(movingOBJInsideContainers[i].velocity);
                if (movingOBJInsideContainers[i].velocity.z > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            if (obj.position.z > containerData.position.z + containerData.dimensions.z / 2 - collisionFix) {
                let oldVelocity = velocity.clone();
                movingOBJInsideContainers[i].velocity.multiply(new THREE.Vector3(1, 1, -1));
                let angle = oldVelocity.angleTo(movingOBJInsideContainers[i].velocity);
                if (movingOBJInsideContainers[i].velocity.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                }
            }
            if (obj.position.z < containerData.position.z - containerData.dimensions.z / 2 + collisionFix) {
                let oldVelocity = velocity.clone();
                movingOBJInsideContainers[i].velocity.multiply(new THREE.Vector3(1, 1, -1));
                let angle = oldVelocity.angleTo(movingOBJInsideContainers[i].velocity);
                if (movingOBJInsideContainers[i].velocity.x > 0) {
                    obj.rotateOnAxis(Y_AXIS, -angle);
                } else {
                    obj.rotateOnAxis(Y_AXIS, angle);
                }
            }
        }
    }
}

/**
 * Takes an object3D and add to him a rotation animation inside a sphere.
 * 
 * @param {Object} data Data for the function
 * @param {Object} data.objectToAnimate THREE.Object3D to animate
 * @param {Object} data.spherePosition position of center of sphere
 * @param {Number} data.radius radius of rotation
 * @param {Object} data.rotationVector vector indicating plane of rotation
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
        sinMultiplier: data.sinMultiplier
    });
    return animationWrapper;
}

function moveObjectInsideContainer(object3D, containerData, velocity) {
    object3D.rotateOnAxis(Y_AXIS, Z_AXIS.angleTo(velocity));
    movingOBJInsideContainers.push({
        object3D: object3D,
        containerData: containerData,
        velocity: velocity,
        collisionFix: 4
    });
}