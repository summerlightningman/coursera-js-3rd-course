// Телефонная книга
let phoneBook = {};

const add = (command) => {
    const [name, phonesStr] = command;
    const phones = phonesStr.split(',');

    phoneBook[name] = phoneBook.hasOwnProperty(name) ? phoneBook[name].concat(phones) : phones
}

const removePhone = (rows) => {
    const [phone] = rows;
    const keys = Object.keys(phoneBook);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const phoneNumbers = phoneBook[key];

        for (let j = 0; j < phoneNumbers.length; j++)
            if (phoneNumbers[j] === phone) {
                phoneNumbers.splice(j, 1);
                return true;
            }

    }
    return false;
}

const show = (_) => {
    const keys = Object.keys(phoneBook)
    const result = []

    const pushResult = (key) => {
        if (phoneBook[key].length > 0) {
            const numbers = phoneBook[key].join(', ');
            const item = key + ': ' + numbers;
            result.push(item);
        }
    }

    keys.forEach(pushResult)
    return result.sort();
}

const operations = {
    ADD: add,
    REMOVE_PHONE: removePhone,
    SHOW: show
}

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    const commandSplit = command.split(' ');

    const operation = commandSplit[0];
    const args = commandSplit.slice(1)

    return operations[operation](args);
};


