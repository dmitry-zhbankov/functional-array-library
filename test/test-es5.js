var assert = require("assert");
var arrayLib = require("../func-arr-lib-es5");

describe("func-mini-lib", function () {
    describe("function first()", function () {
        it("should return 1 when the value is [1, 3, 2, 1, 5, 3]", function () {
            assert.equal(arrayLib.first([1, 3, 2, 1, 5, 3]), 1);
        });

        it("should return 2 when the value is [2, 1, 5, 3]", function () {
            assert.equal(arrayLib.first([2, 1, 5, 3]), 2);
        });
    });

    describe("function last()", function () {
        it("should return 3 when the value is [1, 3, 2, 1, 5, 3]", function () {
            assert.equal(arrayLib.last([1, 3, 2, 1, 5, 3]), 3);
        });

        it("should return 5 when the value is [2, 1, 5]", function () {
            assert.equal(arrayLib.last([2, 1, 5]), 5);
        });
    });

    describe("function take()", function () {
        it("should return [1,3,2] when the parameters are [1, 3, 2, 1, 5, 3] and 3", function () {
            assert.deepEqual(arrayLib.take([1, 3, 2, 1, 5, 3], 3), [1, 3, 2]);
        });

        it("should return [1,3,2,1,5] when the parameters are [1, 3, 2, 1, 5, 3] and 5", function () {
            assert.deepEqual(arrayLib.take([1, 3, 2, 1, 5, 3], 5), [1, 3, 2, 1, 5]);
        });
    });

    describe("function skip()", function () {
        it("should return [1,5,3] when the parameters are [1, 3, 2, 1, 5, 3] and 3", function () {
            assert.deepEqual(arrayLib.skip([1, 3, 2, 1, 5, 3], 3), [1, 5, 3]);
        });

        it("should return [1,5,3] when the parameters are [3, 2, 1, 5, 3] and 2", function () {
            assert.deepEqual(arrayLib.skip([3, 2, 1, 5, 3], 2), [1, 5, 3]);
        });
    });

    describe("function map()", function () {
        it("should return [4,9,16] when the parameters are [2, 3, 4]", function () {
            assert.deepEqual(arrayLib.map([2, 3, 4], function (x) {
                return x * x
            }), [4, 9, 16]);
        });
    });

    describe("function reduce()", function () {
        it("should return 20 when the parameters are [2, 3, 4, 5, 6] and (accum, item) => accum+=item", function () {
            assert.equal(arrayLib.reduce([2, 3, 4, 5, 6], function (accum, item) {
                return accum + item
            }, 0), 20);
        });

        it("should return 20 when the parameters are [2, 3, 4, 5, 6] and (accum, item) => accum+=item and 1", function () {
            assert.equal(arrayLib.reduce([2, 3, 4, 5, 6], function (accum, item) {
                return accum + item
            }, 1), 21);
        });
    });

    describe("function filter()", function () {
        it("should return [2,4,6] when the parameters are [2, 3, 4, 5, 6]", function () {
            assert.deepEqual(arrayLib.filter([2, 3, 4, 5, 6], function (x) {
                return x % 2 === 0
            }), [2, 4, 6]);
        });
    });

    describe("function foreach()", function () {
        it("should return y=20 when the parameters are [2, 3, 4, 5, 6] and x=>y+=x", function () {
            var y = 0;
            arrayLib.foreach([2, 3, 4, 5, 6], function (x) {
                return y += x
            });
            assert.equal(y, 20);
        });
    });

    describe("functions asChain() skip() take() map() filter() value()", function () {
        it("should return [1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 3, take 2", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(3).take(2).value, [1, 5]);
        });

        it("should return [2,1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).value, [2, 1, 5]);
        });

        it("should return [4,1,25] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(function (x) {
                return x * x
            }).value, [4, 1, 25]);
        });

        it("should return [1,25] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(function (x) {
                return x * x
            }).filter(function (x) {
                return x % 2 !== 0
            }).value, [1, 25]);
        });

        it("should return [1,25] and y=26 when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0, foreach x=>y+=x", function () {
            var y = 0;
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(function (x) {
                return x * x
            }).filter(function (x) {
                return x % 2 !== 0
            }).foreach(function (x) {
                return y += x
            }).value, [1, 25]);
            assert.equal(y, 26);
        });

        it("should return 50 and y=26 when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0, foreach x=>y+=x, reduce (function(accum, item){return accum+item})", function () {
            var y = 0;
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(function (x) {
                return x * x
            }).filter(function (x) {
                return x % 2 !== 0
            }).foreach(function (x) {
                return y += x
            }).reduce(function (accum, item) {
                return accum + item
            }, 1), 27);
            assert.equal(y, 26);
        });

        it("should return 50 and y=26 when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0, foreach x=>y+=x, reduce (function(accum, item){return accum*item}, 2)", function () {
            var y = 0;
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(function (x) {
                return x * x
            }).filter(function (x) {
                return x % 2 !== 0
            }).foreach(function (x) {
                return y += x
            }).reduce(function (accum, item) {
                return accum * item
            }, 2), 50);
            assert.equal(y, 26);
        });
    });

    describe("function sumMemo()", function () {
        var t1 = Date.now();
        it("should return (n-1)/2*n=499500 when the parameter is n=1e7", function () {
            var n = 1e7;
            assert.equal(arrayLib.sumMemo(n), (n - 1) / 2 * n);
        });
        var t2 = Date.now();
        var dt11 = t2 - t1;

        t1 = Date.now();
        it("should return (n-1)/2*n=499999500000 when the parameter is n=1e8", function () {
            var n = 1e8;
            assert.equal(arrayLib.sumMemo(n), (n - 1) / 2 * n);
        });
        t2 = Date.now();
        var dt12 = t2 - t1;

        t1 = Date.now();
        it("should return (n-1)/2*n=499500 when the parameter is n=1e7", function () {
            var n = 1e7;
            assert.equal(arrayLib.sumMemo(n), (n - 1) / 2 * n);
        });
        t2 = Date.now();
        var dt21 = t2 - t1;

        t1 = Date.now();
        it("should return (n-1)/2*n=499999500000 when the parameter is n=1e8", function () {
            var n = 1e8;
            assert.equal(arrayLib.sumMemo(n), (n - 1) / 2 * n);
        });
        t2 = Date.now();
        var dt22 = t2 - t1;

        it("t1 should be more than t2 when the parameter is n=1e7", function () {
            assert.equal(dt11 >= dt21, true);
        });

        it("t1 should be more than t2 when the parameter is n=1e8", function () {
            assert.equal(dt12 >= dt22, true);
        });
    });
});
