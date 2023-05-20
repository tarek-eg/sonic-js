"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const utils_1 = require("utils");
describe('toBigNumber', () => {
    test('should parse bigint', () => {
        expect((0, utils_1.toBigNumber)(BigInt(5))).toEqual(new bignumber_js_1.default(5));
    });
    test('should parse string', () => {
        expect((0, utils_1.toBigNumber)('5')).toEqual(new bignumber_js_1.default(5));
    });
    test('should parse number', () => {
        expect((0, utils_1.toBigNumber)(5)).toEqual(new bignumber_js_1.default(5));
    });
    test('should parse BigNumber', () => {
        expect((0, utils_1.toBigNumber)(new bignumber_js_1.default(5))).toEqual(new bignumber_js_1.default(5));
    });
    test('should parse undefined', () => {
        expect((0, utils_1.toBigNumber)(undefined)).toEqual(new bignumber_js_1.default(0));
    });
    test('should parse object', () => {
        expect((0, utils_1.toBigNumber)({})).toEqual(new bignumber_js_1.default(0));
    });
    test('should parse null', () => {
        expect((0, utils_1.toBigNumber)(null)).toEqual(new bignumber_js_1.default(0));
    });
    test('should parse empty string', () => {
        expect((0, utils_1.toBigNumber)('')).toEqual(new bignumber_js_1.default(0));
    });
    test('should', () => {
        expect((0, utils_1.toBigNumber)('asd')).toEqual(new bignumber_js_1.default(0));
    });
});
describe('toExponential', () => {
    test('should return 1', () => {
        expect((0, utils_1.toExponential)('0')).toEqual(new bignumber_js_1.default(1));
    });
    test('should return 100', () => {
        expect((0, utils_1.toExponential)(BigInt(2))).toEqual(new bignumber_js_1.default(100));
    });
    test('should return 100000', () => {
        expect((0, utils_1.toExponential)(5)).toEqual(new bignumber_js_1.default(100000));
    });
});
describe('formatAmount', () => {
    test.each `
    input                 | expected
    ${'0.0000000000001'}  | ${'< 0.01'}
    ${'0.0001'}           | ${'< 0.01'}
    ${'0.00999'}          | ${'< 0.01'}
    ${'1'}                | ${'1'}
    ${'.0'}               | ${'0'}
    ${'.'}                | ${'0'}
    ${'0001.'}            | ${'1'}
    ${'100'}              | ${'100'}
    ${'999'}              | ${'999'}
    ${'9999'}             | ${'9.99k'}
    ${'-9999'}            | ${'-9.99k'}
    ${'99999'}            | ${'99.99k'}
    ${'999999'}           | ${'999.99k'}
    ${'9999999'}          | ${'9.99M'}
    ${'-9999999'}         | ${'-9.99M'}
    ${'99999999'}         | ${'99.99M'}
    ${'999999999'}        | ${'999.99M'}
    ${'9999999999'}       | ${'> 999M'}
    ${'-9999999999'}      | ${'< -999M'}
    ${'-0.0000000000001'} | ${'> -0.01'}
  `('should format $input to $expected', ({ input, expected }) => {
        expect((0, utils_1.formatAmount)(input)).toEqual(expected);
    });
});
//# sourceMappingURL=format.test.js.map