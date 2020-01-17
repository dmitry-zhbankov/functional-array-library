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

    let isArray = function (obj) {
        return Array.isArray(obj);
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
            return;
        }
        if (isArray(arr)) {
            return Array.from(arr).slice(number);
        }
    };

    this.take = function (arr, number) {
        if (isUndefined(number)) {
            if (isNumber(arr)) {
                number = arr;
                this.value = this.value.slice(0, number);
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            return Array.from(arr).slice(0, number);
        }
    };

    this.map = function (arr, func) {
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (let i = 0; i < this.value.length; i++) {
                    this.value[i] = func(this.value[i]);
                }
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
                arr[i] = func(arr[i]);
            }
            return arr;
        }
    };

    this.reduce = function (arr, func, initialValue) {
        if (isUndefined(initialValue)) {
            if (isFunction(arr)) {
                initialValue = func;
                func = arr;
                for (let item of this.value) {
                    initialValue = func(initialValue, item);
                }
                return initialValue;
            }
            return;
        }
        if (isArray(arr)) {
            if (isFunction(func)) {
                for (let item of arr) {
                    initialValue = func(initialValue, item)
                }
                return initialValue;
            }
        }
    };

    this.filter = function (arr, func) {
        let res = [];
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (let item of this.value) {
                    if (func(item)) {
                        res.push(item);
                    }
                }
                this.value = res;
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (let item of arr) {
                if (func(item)) {
                    res.push(item);
                }
            }
            return res;
        }
    };

    this.foreach = function (arr, func) {
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (let item of this.value) {
                    func(item);
                }
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (let item of arr) {
                func(item);
            }
        }
    };

    this.sumMemo = function () {
        let memo = {};

        let sum = function (n) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                sum += i;
            }
            return sum;
        };

        return function (n1) {
            if (n1 in memo) {
                return memo[n1];
            }
            return memo[n1] = sum(n1);
        };
    }();

    return this;

})();

module.exports = arrLib;
