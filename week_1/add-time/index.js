/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    const delta_minutes = minutes + interval;
    const delta_hours = hours + Math.floor(delta_minutes / 60);

    const min = delta_minutes % 60;
    const hrs = delta_hours % 24;

    const minute = min < 10 ? '0' + min : min;
    const hour = hrs < 10 ? '0' + hrs : hrs;

    return hour + ':' + minute;
};
