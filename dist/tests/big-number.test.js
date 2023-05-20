"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
require("../src/big-number");
describe('applyDecimals', () => {
    test('should apply 3 decimals', () => {
        expect(new bignumber_js_1.default(100).applyDecimals(3)).toEqual(new bignumber_js_1.default(0.1));
    });
    test('should apply 8 decimals', () => {
        expect(new bignumber_js_1.default(123).applyDecimals(8)).toEqual(new bignumber_js_1.default(0.00000123));
    });
    test('should apply 0 decimals', () => {
        expect(new bignumber_js_1.default(123).applyDecimals(0)).toEqual(new bignumber_js_1.default(123));
    });
});
describe('removeDecimals', () => {
    test('should remove 3 decimals', () => {
        expect(new bignumber_js_1.default(0.1).removeDecimals(3)).toEqual(new bignumber_js_1.default(100));
    });
    test('should remove 8 decimals', () => {
        expect(new bignumber_js_1.default(0.00000123).removeDecimals(8)).toEqual(new bignumber_js_1.default(123));
    });
    test('should remove 0 decimals', () => {
        expect(new bignumber_js_1.default(123).removeDecimals(0)).toEqual(new bignumber_js_1.default(123));
    });
});
describe('toBigInt', () => {
    test('should throw if provided number is floating', () => {
        expect(() => new bignumber_js_1.default(5.5).toBigInt()).toThrow();
    });
    test('should return a bigint', () => {
        expect(new bignumber_js_1.default(5).toBigInt()).toEqual(BigInt(5));
    });
});
describe('applyTolerance', () => {
    test('should return the value with minimal tolerance', () => {
        expect(new bignumber_js_1.default(5).applyTolerance(0.1)).toEqual(new bignumber_js_1.default(4.5));
    });
    test('should return the value with maximal tolerance', () => {
        expect(new bignumber_js_1.default(5).applyTolerance(0.1, 'max')).toEqual(new bignumber_js_1.default(5.5));
    });
});
//# sourceMappingURL=big-number.test.js.map