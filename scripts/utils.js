/**
 * Returns a random number between min and max numbers included
 * @param {Integer} min Minimun number range
 * @param {Integer} max Maximum number range
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Maps linear values between input range between outout range. 
 * @param {Number} value Value to map
 * @param {Number} istart input range start
 * @param {Number} istop input range stop
 * @param {Number} ostart output range start
 * @param {Number} ostop output range stop
 */
function mapValues(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/**
 * Swap values of an array passed.
 * @param {Array} arr Array
 * @param {Number} a Index
 * @param {Number} b Index
 */
function swapArrayValues(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

/**
 * Create Stats for canvas and returns a reference to an istance of that plugin.
 * Requires stats.js
 */
function createStats() {
    let stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    return stats;
}

/**
 * 
 * @param {Number} c 
 */
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/**
 * Converts an rgb color to the equivalent hex value
 * @param {Number} r red value of color
 * @param {Number} g green value of color
 * @param {Number} b blue value of color
 * @returns {String} String represinting the hex value of the color
 */
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Return if (i,j) is a valid couple of index for a bidimensional array of size [mi-1][mj-1]
 */
function inBound2(i, j, mi, mj) {
    return ((i >= 0) && (i <= mi) && (j >= 0) && (j <= mj));
}

/**
 * Converts an angle in degrees in the corrisponding angle in radians
 * 
 * @param {Number} deg angle expressed in degrees
 * @returns {Number} Angle expressend in radians
 */
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Converts an angle in radians in the corrisponding angle in degrees
 * 
 * @param {Number} rad angle expressed in degrees
 * @returns {Number} Angle expressend in radians
 */
function radToDeg(rad) {
    return rad * (180/Math.PI);
}

/**
 * Checks if a vector calculating his distance to the vector (2^-52, 2^-52, 2^-52).
 * If distance is less returns true, otherwise false.
 * 
 * @param {Object} vector 3d vector to check
 * @returns {Boolean} true if vector is a null vector, false otheriwise
 */
function isNullVector(vector) {
    return (Math.abs(vector.x) < Number.EPSILON)
        && (Math.abs(vector.y) < Number.EPSILON)
        && (Math.abs(vector.z) < Number.EPSILON);
}

/**
 * Checks if an object is going to a target position (in a line)
 * If object is hover target returns false.
 * 
 * @param {Object} currPosition 3d Vector of current position
 * @param {Object} direction 3d Vector of object direction
 * @param {Object} destPosition 3d Vector of target position
 * @returns {Boolean} true if is going to hit, false otherwise
 */
function isOBJMovingTo(currPosition, direction, destPosition) {
    let calculatedDirection = new THREE.Vector3(
        destPosition.x - currPosition.x,
        destPosition.y - currPosition.y,
        destPosition.z - currPosition.z 
    );
    
    if (isNullVector(calculatedDirection)){
        return false;
    }

    return (Math.abs(direction.angleTo(calculatedDirection)) < MAX_DIFFERENCE_ANGLE);
}