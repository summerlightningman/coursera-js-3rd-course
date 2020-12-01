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

const intersectionByValues = (obj) => {
    Object.keys(obj).forEach(key => obj[key] = obj[key].reduce(intersection));
    return obj
}

const intersection = (left, right) => {
    return left.filter(element => right.indexOf(element) >= 0)
}

const groupBy = (collection) => {
    const filter = {}
    collection.forEach(([key, values]) => {
        if (key === undefined)
            return
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

    const needUseMethod = element => element.length > 0;
    const operations = Array.from(arguments).slice(1);

    const filters = operations
        .filter(([method, ..._]) => method === 'filter')
        .map(([_, values]) => values);

    if (filters.some(needUseMethod)) {
        const grouped = groupBy(filters);
        const filterObject = intersectionByValues(grouped);
        collection = collection.filter(row => {
            return Object.keys(filterObject).map(key => {
                if (row.hasOwnProperty(key))
                    return filterObject[key].indexOf(row[key]) > 0
                else
                    return false
            }).every(element => element);
        });
    }

    const selects = operations
        .filter(([method, ..._]) => method === 'select')
        .map(([_, ...keys]) => keys[0]);

    if (selects.length > 0) {
        const keysToSelect = selects.reduce(intersection);
        collection.forEach(row => {
            Object.keys(row).forEach(key => {
                if (keysToSelect.indexOf(key) >= 0) {
                    delete row[key];
                }
            });
        });
    }
    return collection;

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
