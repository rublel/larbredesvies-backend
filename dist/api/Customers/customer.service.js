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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../../models/customer.entity");
const common_2 = require("@nestjs/common");
const customers_action_1 = require("./customers.action");
const transaction_entity_1 = require("../../models/transaction.entity");
const email_validator_1 = require("email-validator");
let CustomerService = class CustomerService extends customers_action_1.CustomersAction {
    constructor(customerRepository, logger) {
        super(customerRepository, logger);
        this.customerRepository = customerRepository;
        this.logger = logger;
    }
    async getCustomers(query) {
        const page = query.page || 1;
        const perPage = +query.perPage || 20;
        const isAsc = query.isAsc || 'DESC';
        const sortBy = query.sortBy || 'id';
        const [result, total] = await this.customerRepository.findAndCount({
            order: { [sortBy]: isAsc },
            take: perPage,
            skip: (+page - 1) * perPage,
        });
        return {
            data: result,
            total,
            perPage,
        };
    }
    async getCustomer(id) {
        const checker = await this.customerRepository.findBy({ id });
        let response = {};
        (checker === null || checker === void 0 ? void 0 : checker.length)
            ? (response = checker[0])
            : ((response = {
                exist: false,
                error: `Customer with id ${id} does not exist`,
            }),
                this.logger.error(`Customer with id ${id} does not exist`));
        return response;
    }
    async searchCustomer({ queryString, queryFilters, }) {
        const page = queryFilters.page || 1;
        const perPage = +queryFilters.perPage || 20;
        const isAsc = queryFilters.isAsc || 'DESC';
        const sortBy = queryFilters.sortBy || 'id';
        const [result, total] = await this.customerRepository.findAndCount({
            where: [
                { name: (0, typeorm_2.Like)(`%${queryString}%`) },
                { siret: (0, typeorm_2.Like)(`%${queryString}%`) },
                { email: (0, typeorm_2.Like)(`%${queryString}%`) },
            ],
            order: { [sortBy]: isAsc },
            take: perPage,
            skip: (page - 1) * perPage,
        });
        return {
            data: result,
            count: total,
        };
    }
    async addCustomer(customer) {
        const checker = await this.checkIfExist(customer.email);
        return customer.email && customer.email.length > 0
            ? !(checker === null || checker === void 0 ? void 0 : checker.exist)
                ? (0, email_validator_1.validate)(customer.email)
                    ? this.customerRepository.save(customer)
                    : { error: `L'email ${customer.email} n'est pas valide !` }
                : { error: `L'email ${customer.email} existe déjà !` }
            : { error: `Adresse email obligatoire !` };
    }
    async updateCustomer(customer) {
        const exist = await this.customerRepository.find({
            where: { id: customer.id },
        });
        if (!(exist === null || exist === void 0 ? void 0 : exist.length))
            return { error: `Le client ${customer.id} n'existe pas` };
        const checker = await this.checkIfExist(customer.email);
        if (customer.password) {
            return {
                error: `Le mot de passe ne peut pas être modifié !`,
            };
        }
        if (customer.email && !(0, email_validator_1.validate)(customer.email)) {
            return {
                error: `L'email ${customer.email} n'est pas valide !`,
            };
        }
        const currentEmail = await this.getCustomer(customer.id).then((res) => {
            if (res instanceof customer_entity_1.Customer)
                return res.email;
        });
        return !customer.email ||
            !checker ||
            (checker && currentEmail === customer.email)
            ? ((customer.last_update = new Date()),
                await this.customerRepository.update(customer.id, customer),
                this.getCustomer(customer.id))
            : {
                error: `L'email ${customer.email} est déjà utilisé !`,
            };
    }
    deleteCustomer(id) {
        return this.customerRepository.delete({ id });
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction),
    __metadata("design:type", typeorm_2.Repository)
], CustomerService.prototype, "orderRepository", void 0);
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_2.Logger])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map