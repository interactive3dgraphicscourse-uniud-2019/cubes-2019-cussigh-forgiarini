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
    return deg * (Math.PI / 180)
}
