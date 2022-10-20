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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../models/category.entity");
const product_entity_1 = require("../../models/product.entity");
const frontEndFormatter_1 = require("../../utils/Formatter/frontEndFormatter");
const catalog_service_1 = require("./catalog.service");
let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async getAllProducts(query) {
        const response = await this.catalogService.getAllProducts(query);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async getProduct(id) {
        const response = await this.catalogService.getProduct(id);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async getCategory(id) {
        const response = await this.catalogService.getCategory(id);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async getCategories() {
        const response = await this.catalogService.getCategories();
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async addCategory(categoryData) {
        const response = await this.catalogService.addCategory(categoryData);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async addProduct(productData) {
        const response = await this.catalogService.addProduct(productData);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async updateProduct(productData) {
        const response = await this.catalogService.updateProduct(productData);
        return await frontEndFormatter_1.default.format({ records: response });
    }
    async deleteProduct(id) {
        const response = await this.catalogService.deleteProduct(id);
        return await frontEndFormatter_1.default.format({ records: response });
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('product'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('category'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.Category]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Post)('product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_entity_1.Product]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)('product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_entity_1.Product]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('product'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "deleteProduct", null);
CatalogController = __decorate([
    (0, common_1.Controller)('catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
exports.CatalogController = CatalogController;
//# sourceMappingURL=catalog.controller.js.map