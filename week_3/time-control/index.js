const isValuePositive = function (value) {
    if (value < 0)
        throw TypeError('Value must be > 0')
}

const add = function (val, unit) {
    this._validateVal(val);

    const timestamp = this._datetime.getTime();

    switch (unit) {
        case 'years':
            const year = this._datetime.getFullYear();
            const newYear = year + val;

            this._datetime.setFullYear(newYear);
            return this
        case 'months':
            const month = this._datetime.getMonth();

            const monthSum = month + val;
            const newMonth = monthSum % 12;

            this._datetime.setMonth(newMonth);
            if (monthSum < 12)
                return this;

            const deltaYear = Math.floor(monthSum / 12);
            return this.add(deltaYear, 'years');
        case 'days':
            this._datetime = new Date(timestamp + val * 24 * 3600 * 1000);
            return this
        case 'hours':
            this._datetime = new Date(timestamp + val * 3600 * 1000);
            return this
        case 'minutes':
            this._datetime = new Date(timestamp + val * 60 * 1000);
            return this
        default:
            throw TypeError('Time unit is invalid');
    }
};

const sub = function (val, unit) {
    this._validateVal(val)

    const timestamp = this._datetime.getTime();

    switch (unit) {
        case 'years':
            const year = this._datetime.getFullYear();
            const newYear = year - val;

            this._datetime.setFullYear(newYear);
            return this
        case 'months':
            const month = this._datetime.getMonth();

            const monthDiff = month - val;
            if (monthDiff >= 0){
                this._datetime.setMonth(monthDiff);
                return this
            }

            const newMonth = 12 - Math.abs(monthDiff) % 12;
            this._datetime.setMonth(newMonth);
            const deltaYear = Math.ceil(Math.abs(monthDiff) / 12);
            return this.subtract(deltaYear, 'years');
        case 'days':
            this._datetime = new Date(timestamp - val * 24 * 3600 * 1000);
            return this
        case 'hours':
            this._datetime = new Date(timestamp - val * 3600 * 1000);
            return this
        case 'minutes':
            this._datetime = new Date(timestamp - val * 60 * 1000);
            return this
        default:
            throw TypeError('Time unit is invalid');
    }
};



const set = function (value) {
    this._datetime = value;
}

const get = function () {
    const year = this._datetime.getFullYear(),
        month = this._datetime.getMonth() + 1 < 10 ? '0' + (this._datetime.getMonth() + 1) : (this._datetime.getMonth() + 1),
        day = this._datetime.getDate() < 10 ? '0' + this._datetime.getDate() : this._datetime.getDate(),
        hour = this._datetime.getHours() < 10 ? '0' + this._datetime.getHours() : this._datetime.getHours(),
        minute = this._datetime.getMinutes() < 10 ? '0' + this._datetime.getMinutes() : this._datetime.getMinutes();
    return `${year}-${month}-${day} ${hour}:${minute}`
};

const argList = [
    ['value', {get: get, set: set}],
    ['add', {value: add}],
    ['subtract', {value: sub}],
    ['_validateVal', {value: isValuePositive}]
]

const parsePattern = /[-:\s]/;

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    const [year, month, day, hour, minute] = date.split(parsePattern).map(Number);
    const value = new Date(year, month - 1, day, hour, minute);
    const datetimeObject = {
        _datetime: value
    };

    argList.forEach((args) => Object.defineProperty(datetimeObject, ...args));
    return datetimeObject
};


