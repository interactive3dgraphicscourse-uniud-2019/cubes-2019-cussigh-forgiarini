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