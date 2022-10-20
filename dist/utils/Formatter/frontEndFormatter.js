"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_entity_1 = require("./response.entity");
class FrontEndFormatter extends response_entity_1.Response {
    static async format(object) {
        const sdk = await this.adaptToSDK(object.records);
        return sdk;
    }
    static async adaptToSDK(response, scroll_id = null) {
        let responseSdk = (response === null || response === void 0 ? void 0 : response.error)
            ? { error: response.error, success: false }
            : { records: response, success: true };
        if (Array.isArray(response))
            responseSdk['totalSize'] = response.length;
        return responseSdk;
    }
}
exports.default = FrontEndFormatter;
//# sourceMappingURL=frontEndFormatter.js.map