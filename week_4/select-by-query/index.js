var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];

const intersectionByValues = obj => {
    Object.keys(obj).forEach(key => obj[key] = obj[key].reduce(intersection));
    return obj
}

const intersection = (left, right) => {
    return left.filter(element => right.indexOf(element) >= 0)
}

const groupBy = (collection) => {
    const filter = {}
    collection.forEach(([key, values]) => {
        if (filter[key] === undefined)
            filter[key] = [values];
        else
            filter[key].push(values);
    })
    return filter
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    if (arguments.length === 1)
        return collection

    let arr = collection.slice(); // copy
    const operations = Array.from(arguments).slice(1);

    const filterMethods = operations.filter(([method, ..._]) => method === 'filter');

    if (filterMethods.length > 0) {
        const filters = filterMethods.map(([_, values]) => values);
        const grouped = groupBy(filters);
        const filterObject = intersectionByValues(grouped);
        arr = arr.filter(row => {
            return Object.keys(filterObject).map(key => {
                if (row.hasOwnProperty(key))
                    return filterObject[key].indexOf(row[key]) >= 0
                else
                    return false
            }).every(element => element);
        });
    }

    const selectMethods = operations.filter(([method, ..._]) => method === 'select');
    if (selectMethods.length > 0) {
        const selects = selectMethods.map(([_, keys]) => keys);
        const keysToSelect = selects.reduce(intersection);
        arr.forEach(row => {
            Object.keys(row).forEach(key => {
                if (keysToSelect.indexOf(key) === -1) {
                    delete row[key];
                }
            });
        });
    }
    return arr;

}

/**
 * @params {String[]}
 */
function select() {
    const keys = Array.from(arguments);
    return ['select', keys]
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ['filter', [property, values]]
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
