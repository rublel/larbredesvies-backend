"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transaction_entity_1 = require("../../models/transaction.entity");
const frontEndFormatter_1 = require("../../utils/Formatter/frontEndFormatter");
const transaction_service_1 = require("./transaction.service");
const customer_service_1 = require("../Customers/customer.service");
let TransactionsController = class TransactionsController {
    constructor(transactionsService, customerService) {
        this.transactionsService = transactionsService;
        this.customerService = customerService;
    }
    async getCustomerTransactions(id) {
        const response = await this.transactionsService.getCustomerTransactions(id);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async addTransaction(transaction) {
        const response = await this.transactionsService.addTransaction(transaction);
        return await frontEndFormatter_1.default.format({ records: response });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getCustomerTransactions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_entity_1.Transaction]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "addTransaction", null);
TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionsService,
        customer_service_1.CustomerService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transaction.controller.js.map