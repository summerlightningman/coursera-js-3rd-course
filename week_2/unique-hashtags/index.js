/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    const newList = [];

    const addUnique = (hashtag) => {
        const elem = hashtag.toLowerCase()

        if (newList.indexOf(elem) === -1)
            newList.push(elem);
    }

    hashtags.forEach(addUnique)

    return newList.join(', ')
};
