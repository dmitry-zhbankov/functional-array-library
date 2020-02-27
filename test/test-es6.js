let assert = require("assert");
const {performance} = require("perf_hooks");
let arrayLib = require("../func-arr-lib-es6");
let chainLib = require("../chain-lib");

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
            assert.deepEqual(arrayLib.map([2, 3, 4], x => x * x), [4, 9, 16]);
        });
    });

    describe("function reduce()", function () {
        it("should return 20 when the parameters are [2, 3, 4, 5, 6] and (accum, item) => accum+=item", function () {
            assert.equal(arrayLib.reduce([2, 3, 4, 5, 6], (accum, item) => accum + item, 0), 20);
        });

        it("should return 20 when the parameters are [2, 3, 4, 5, 6] and (accum, item) => accum+=item and 1", function () {
            assert.equal(arrayLib.reduce([2, 3, 4, 5, 6], (accum, item) => accum + item, 1), 21);
        });
    });

    describe("function filter()", function () {
        it("should return [2,4,6] when the parameters are [2, 3, 4, 5, 6]", function () {
            assert.deepEqual(arrayLib.filter([2, 3, 4, 5, 6], x => x % 2 === 0), [2, 4, 6]);
        });
    });

    describe("function foreach()", function () {
        it("should return y=20 when the parameters are [2, 3, 4, 5, 6] and x=>y+=x", function () {
            let y = 0;
            arrayLib.foreach([2, 3, 4, 5, 6], x => y += x);
            assert.equal(y, 20);
        });
    });

    describe("functions asChain() skip() take() map() filter() value()", function () {
        it("should return [1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 3, take 2", function () {
            assert.deepEqual(chainLib.chain([1, 3, 2, 1, 5, 3]).skip(3).take(2).result, [1, 5]);
        });

        it("should return [2,1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3", function () {
            assert.deepEqual(chainLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).result, [2, 1, 5]);
        });

        it("should return [4,1,25] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x", function () {
            assert.deepEqual(chainLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(x => x * x).result, [4, 1, 25]);
        });

        it("should return [1,25] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0", function () {
            assert.deepEqual(chainLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(x => x * x).filter(x => x % 2 !== 0).result, [1, 25]);
        });

        it("should return [1,25] and y=26 when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0, foreach x=>y+=x", function () {
            let y = 0;
            chainLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(x => x * x).filter(x => x % 2 !== 0).foreach(x => y += x);
            assert.equal(y, 26);
        });

        it("should return 50 and y=26 when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3, map x=>x*x, filter x=>x%2!==0, foreach x=>y+=x, reduce ((accum, item) => accum * item, 2)", function () {
            assert.deepEqual(chainLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).map(x => x * x).filter(x => x % 2 !== 0).reduce((accum, item) => accum + item, 2).result, 28);
        });
    });

    describe("function memo()", function () {
        let sumN = function (n) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                sum += i;
            }
            return sum;
        };

        let sumMemo = arrayLib.memo(sumN);

        let t1, t2;
        let dt11, dt12, dt21, dt22;

        let n = 1e7;
        t1 = performance.now();
        let res = sumMemo(n);
        t2 = performance.now();
        dt11 = t2 - t1;
        it("should return (n-1)/2*n=499500 when the parameter is n=1e7", function () {

            assert.equal(res, (n - 1) / 2 * n);
        });

        t1 = performance.now();
        res = sumMemo(n);
        t2 = performance.now();
        dt21 = t2 - t1;
        it("should return (n-1)/2*n=499500 when the parameter is n=1e7", function () {
            assert.equal(res, (n - 1) / 2 * n);
        });

        n = 1e8;
        t1 = performance.now();
        res = sumMemo(n);
        t2 = performance.now();
        dt12 = t2 - t1;
        it("should return (n-1)/2*n=499999500000 when the parameter is n=1e8", function () {
            assert.equal(res, (n - 1) / 2 * n);
        });

        t1 = performance.now();
        res = sumMemo(n);
        t2 = performance.now();
        dt22 = t2 - t1;
        it("should return (n-1)/2*n=499999500000 when the parameter is n=1e8", function () {
            assert.equal(sumMemo(n), (n - 1) / 2 * n);
        });

        it("t1 should be more than t2 when the parameter is n=1e7", function () {
            assert.equal(dt11 > dt21, true);
        });

        it("t1 should be more than t2 when the parameter is n=1e8", function () {
            assert.equal(dt12 > dt22, true);
        });
    });
});
