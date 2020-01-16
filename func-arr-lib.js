let arrLib = (function () {

    this.value = [];

    let isUndefined = function (obj) {
        return typeof obj === "undefined";
    };

    let isNumber = function (obj) {
        return typeof obj === "number";
    };

    let isFunction = function (obj) {
        return typeof obj === "function";
    };

    this.chain = function (arr) {

        this.value = Array.from(arr);
        return this;
    };

    this.first = function (arr) {
        return arr[0];
    };

    this.last = function (arr) {
        let n = Array.from(arr).length;
        return arr[n - 1];
    };

    this.skip = function (arr, number) {
        if (isUndefined(number)) {
            if (isNumber(arr)) {
                number = arr;
                this.value = this.value.slice(number);
                return this;
            }
        }
        return Array.from(arr).slice(number);
    };

    this.take = function (arr, number) {
        if (isUndefined(number)) {
            if (isNumber(arr)) {
                number = arr;
                this.value = this.value.slice(0, number);
                return this;
            }
        }
        return Array.from(arr).slice(0, number);
    };

    this.map = function (arr, func) {
        if (isUndefined(func)) {
            if (isFunction(func)) {
                func = arr;
                for (let i = 0; i < this.value.length; i++) {
                    this.value[i] = func(this.value[i]);
                }
                return this;
            }
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = func(arr[i]);
        }
        return arr;
    };

    this.filter = function (arr, func) {
        let res = [];
        if (isUndefined(func)) {
            if (isFunction(func)) {
                func = arr;
                for (let item of this.value) {
                    if (func(item)) {
                        res = [...res, item];
                    }
                }
                this.value = res;
                return this;
            }
        }
        for (let item of arr) {
            if (func(item)) {
                res = [...res, item];
            }
        }
        return res;
    };

    return this;

})();

module.exports = arrLib;
