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
exports.TransactionsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const transaction_entity_1 = require("../../models/transaction.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository, logger) {
        this.transactionRepository = transactionRepository;
        this.logger = logger;
    }
    async addTransaction(orderData) {
        var _a, _b, _c;
        if (!orderData.customer_id) {
            return { error: 'Customer ID is required' };
        }
        const maxId = await this.transactionRepository.find({
            order: { id: 'DESC' },
        });
        const newId = `CMD00${+((_b = (_a = maxId[0]) === null || _a === void 0 ? void 0 : _a.order_id) === null || _b === void 0 ? void 0 : _b.slice(5)) + 1 || 1}`;
        ((_c = orderData === null || orderData === void 0 ? void 0 : orderData.products) === null || _c === void 0 ? void 0 : _c.length)
            ? await Promise.all(orderData.products.map(async (product, i) => {
                await this.transactionRepository.save(new transaction_entity_1.Transaction({
                    order_id: newId,
                    customer_id: orderData.customer_id,
                    product_id: orderData.products[i].product_id,
                    quantity: orderData.products[i].quantity,
                    price: orderData.products[i].price,
                    total: orderData.total,
                    line: i + 1,
                }));
            }))
            : await this.transactionRepository.save(new transaction_entity_1.Transaction({
                order_id: newId,
                customer_id: orderData.customer_id,
                product_id: orderData.product_id || 99999,
                quantity: orderData.quantity,
                price: orderData.price,
                total: orderData.total,
                type: 'GLOBAL_ORDER',
            }));
        this.logger.log(`Order with id ${newId} created`, 'Transaction');
        return this.transactionRepository.find({
            where: { order_id: newId },
        });
    }
    async getCustomerTransactions(id) {
        const transactions = await this.transactionRepository.find({
            where: { customer_id: id },
        });
        const transactionsById = transactions.reduce((acc, cur) => {
            if (!acc[cur.order_id]) {
                acc[cur.order_id] = [];
            }
            acc[cur.order_id].push(cur);
            return acc;
        }, {});
        return Object.assign({ count: Object.keys(transactionsById).length }, transactionsById);
    }
};
TransactionsService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transaction.service.js.map