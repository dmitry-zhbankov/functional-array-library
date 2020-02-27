let arrLib = require("./func-arr-lib-es6");

let chainLib = (function () {
    let chain = function (arr) {
        context.result = arr;
        return context;
    };

    let chainify = function (f) {
        return function (...args) {
            context.result = f(context.result, ...args);
            return context;
        }
    };

    let context = {
        result: undefined,
        chain: chain,
        skip: chainify(arrLib.skip),
        take: chainify(arrLib.take),
        map: chainify(arrLib.map),
        reduce: chainify(arrLib.reduce),
        filter: chainify(arrLib.filter),
        foreach: chainify(arrLib.foreach)
    };

    return context;
})();

module.exports = chainLib;
