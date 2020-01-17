var arrLib = (function () {
    var i;

    var isUndefined = function (obj) {
        return typeof obj === "undefined";
    };

    var isNumber = function (obj) {
        return typeof obj === "number";
    };

    var isFunction = function (obj) {
        return typeof obj === "function";
    };

    var isArray = function (obj) {
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
        var n = Array.from(arr).length;
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
            return arr.slice(number);
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
            return arr.slice(0, number);
        }
    };

    this.map = function (arr, func) {
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (i = 0; i < this.value.length; i++) {
                    this.value[i] = func(this.value[i]);
                }
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (i = 0; i < arr.length; i++) {
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
                for (i = 0; i < this.value.length; i++) {
                    initialValue = func(initialValue, this.value[i]);
                }
                return initialValue;
            }
            return;
        }
        if (isArray(arr)) {
            if (isFunction(func)) {
                for (i = 0; i < arr.length; i++) {
                    initialValue = func(initialValue, arr[i])
                }
                return initialValue;
            }
        }
    };

    this.filter = function (arr, func) {
        var res = [];
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (i = 0; i < this.value.length; i++) {
                    if (func(this.value[i])) {
                        res.push(this.value[i]);
                    }
                }
                this.value = res;
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (i = 0; i < arr.length; i++) {
                if (func(arr[i])) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    };

    this.foreach = function (arr, func) {
        if (isUndefined(func)) {
            if (isFunction(arr)) {
                func = arr;
                for (i = 0; i < this.value.length; i++) {
                    func(this.value[i]);
                }
                return this;
            }
            return;
        }
        if (isArray(arr)) {
            for (i = 0; i < arr.length; i++) {
                func(arr[i]);
            }
        }
    };

    this.sumMemo = function () {
        var memo = {};

        var sum = function (n) {
            var sum = 0;
            for (i = 0; i < n; i++) {
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
