let assert = require("assert");
let arrayLib = require("../func-arr-lib");

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

    describe("functions asChain() skip() take() value()", function () {
        it("should return [1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 3, take 2", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(3).take(2).value, [1, 5]);
        });

        it("should return [2,1,5] when the parameters are [1, 3, 2, 1, 5, 3], skip 2, take 3", function () {
            assert.deepEqual(arrayLib.chain([1, 3, 2, 1, 5, 3]).skip(2).take(3).value, [2, 1, 5]);
        });
    });

    describe("function map()", function () {
        it("should return [4,9,16] when the parameters are [2, 3, 4]", function () {
            assert.deepEqual(arrayLib.map([2, 3, 4], x => x * x), [4, 9, 16]);
        });
    });

    describe("function filter()", function () {
        it("should return [2,4,6] when the parameters are [2, 3, 4, 5, 6]", function () {
            assert.deepEqual(arrayLib.filter([2, 3, 4, 5, 6], x => x % 2 === 0), [2, 4, 6]);
        });
    });
});
