"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const catalog_module_1 = require("./api/Catalog/catalog.module");
const customer_module_1 = require("./api/Customers/customer.module");
const transaction_module_1 = require("./api/Transactions/transaction.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_entity_1 = require("./models/category.entity");
const customer_entity_1 = require("./models/customer.entity");
const product_entity_1 = require("./models/product.entity");
const transaction_entity_1 = require("./models/transaction.entity");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
    onApplicationBootstrap() {
        console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USERNAME, process.env.DB_PASWORD, process.env.DB);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASWORD,
                database: process.env.DB,
                entities: [product_entity_1.Product, customer_entity_1.Customer, transaction_entity_1.Transaction, category_entity_1.Category],
                synchronize: true,
            }),
            catalog_module_1.CatalogModule,
            customer_module_1.CustomerModule,
            transaction_module_1.TransactionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map