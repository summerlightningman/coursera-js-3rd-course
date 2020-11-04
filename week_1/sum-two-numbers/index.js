/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
module.exports = function (a, b) {
    const left = Number(a);
    const right = Number(b);
    if (isNaN(left) || isNaN(right))
        return NaN
    else
        return left + right

};
