"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersAction = void 0;
class CustomersAction {
    constructor(customerModel, log) {
        this.customerModel = customerModel;
        this.log = log;
    }
    async checkIfExist(email) {
        email ? email.split(' ').join('').toLowerCase() : null;
        const response = await this.customerModel.findBy({ email });
        if (response.length) {
            return {
                exist: true,
            };
        }
    }
}
exports.CustomersAction = CustomersAction;
//# sourceMappingURL=customers.action.js.map