/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    const isHashtag = (word) => {
        return word.startsWith('#')
    }

    const removeHash = (word) => {
        return word.slice(1)
    }

    return tweet.split(' ').filter(isHashtag).map(removeHash)
};
