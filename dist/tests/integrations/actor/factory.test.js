"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integrations_1 = require("../../../src/integrations");
describe('createSwapActor', () => {
    test('should create an actor', async () => {
        const actor = await (0, integrations_1.createSwapActor)();
        expect(actor).toBeDefined();
    });
});
describe('createTokenActor', () => {
    test('should create a token actor', async () => {
        const actor = await (0, integrations_1.createTokenActor)({
            canisterId: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            isIcrc1: false,
        });
        expect(actor).toBeDefined();
    });
});
//# sourceMappingURL=factory.test.js.map