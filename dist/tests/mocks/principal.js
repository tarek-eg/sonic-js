"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPrincipal = exports.mockPrincipalId = void 0;
const principal_1 = require("@dfinity/principal");
const mockPrincipalId = () => '4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae';
exports.mockPrincipalId = mockPrincipalId;
const mockPrincipal = () => principal_1.Principal.fromText((0, exports.mockPrincipalId)());
exports.mockPrincipal = mockPrincipal;
//# sourceMappingURL=principal.js.map