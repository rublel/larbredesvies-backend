"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendFormatter = void 0;
const common_1 = require("@nestjs/common");
const frontEndFormatter_1 = require("./frontEndFormatter");
class BackendFormatter {
    static async logger(func) {
        try {
            let response;
            if (Array.isArray(func)) {
                response = await Promise.all(func.map(async (f) => await f));
            }
            else {
                response = await func;
            }
            this.log.log(await frontEndFormatter_1.default.format({ records: response }));
            return response;
        }
        catch (error) {
            this.log.error(`Error: ${error}`);
        }
    }
}
exports.BackendFormatter = BackendFormatter;
BackendFormatter.log = new common_1.Logger(BackendFormatter.name);
//# sourceMappingURL=backEndFormatter.js.map