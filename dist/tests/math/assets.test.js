"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../../src/math");
const utils_1 = require("../../src/utils");
const token_1 = require("../mocks/token");
describe('Assets', () => {
    describe('.getMaxDepositAmount', () => {
        test.each `
      token                                                 | amount         | expected
      ${(0, token_1.mockToken)()}                                        | ${'0'}         | ${0.004}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'4'}         | ${8}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'6'}         | ${10}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'1'}         | ${5}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(2000000) })}   | ${'1'}         | ${1.04}
      ${(0, token_1.mockToken)({ decimals: 0, fee: BigInt(20) })}        | ${'41'}        | ${81}
      ${(0, token_1.mockToken)({ decimals: 0, fee: BigInt(20) })}        | ${'39.999999'} | ${79.999999}
    `('should return the expected BigNumber', ({ token, amount, expected }) => {
            expect(math_1.Assets.getDepositAmount({ token, amount })).toEqual((0, utils_1.toBigNumber)(expected));
        });
        test('should throw for negative values', () => {
            expect(() => math_1.Assets.getDepositAmount({
                token: (0, token_1.mockToken)(),
                amount: '-10.00',
            })).toThrow();
        });
    });
    describe('.getWithdrawAmount', () => {
        test.each `
      token                                                 | amount         | expected
      ${(0, token_1.mockToken)()}                                        | ${'0'}         | ${0}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'4'}         | ${2}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'6'}         | ${4}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(200000000) })} | ${'2'}         | ${0}
      ${(0, token_1.mockToken)({ decimals: 8, fee: BigInt(2000000) })}   | ${'1'}         | ${0.98}
      ${(0, token_1.mockToken)({ decimals: 0, fee: BigInt(20) })}        | ${'21'}        | ${1}
      ${(0, token_1.mockToken)({ decimals: 0, fee: BigInt(20) })}        | ${'19.999999'} | ${0}
    `('should return the expected BigNumber', ({ token, amount, expected }) => {
            expect(math_1.Assets.getWithdrawAmount({ token, amount })).toEqual((0, utils_1.toBigNumber)(expected));
        });
        test('should throw for negative values', () => {
            expect(() => math_1.Assets.getWithdrawAmount({
                token: (0, token_1.mockToken)(),
                amount: '-10.00',
            })).toThrow();
        });
    });
});
//# sourceMappingURL=assets.test.js.map