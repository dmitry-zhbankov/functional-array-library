let arrLib = (function () {
    let first = function (arr) {
        if (arr.length > 0)
            return arr[0];
        return null;
    };

    let last = function (arr) {
        let n = arr.length;
        if (n > 0)
            return arr[n - 1];
        return null;
    };

    let skip = function (arr, number) {
        return arr.slice(number);
    };

    let take = function (arr, number) {
        return arr.slice(0, number);
    };

    let map = function (arr, func) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = func(arr[i]);
        }
        return arr;
    };

    let reduce = function (arr, func, initialValue) {
        for (let item of arr) {
            initialValue = func(initialValue, item)
        }
        return initialValue;
    };

    let filter = function (arr, func) {
        let res = [];
        for (let item of arr) {
            if (func(item)) {
                res.push(item);
            }
        }
        return res;
    };

    let foreach = function (arr, func) {
        for (let item of arr) {
            func(item);
        }
    };

    let memo = function (f) {
        let mem = {};
        return function (n) {
            if (n in mem) {
                return mem[n];
            } else {
                return mem[n] = f(n);
            }
        }
    };

    return {
        first: first,
        last: last,
        skip: skip,
        take: take,
        map: map,
        reduce: reduce,
        filter: filter,
        foreach: foreach,
        memo: memo
    };
})();

module.exports = arrLib;
