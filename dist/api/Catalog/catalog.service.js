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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../../models/product.entity");
const category_entity_1 = require("../../models/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const backEndFormatter_1 = require("../../utils/Formatter/backEndFormatter");
let CatalogService = class CatalogService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async getAllProducts(query) {
        const page = query.page || 1;
        const perPage = +query.perPage || 20;
        const isAsc = query.isAsc || 'DESC';
        const sortBy = query.sortBy || 'id';
        const [result, total] = await this.productRepository.findAndCount({
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
    async getProduct(id) {
        const product = await this.productRepository.findBy({ id });
        return product.length
            ? product
            : {
                error: `Le produit ${id} n'existe pas`,
            };
    }
    async addProduct(product) {
        const existCategory = await this.categoryRepository.findBy({
            id: product.category,
        });
        return !product.price ||
            !product.name ||
            !product.reference ||
            !product.category
            ? { error: 'Tout les champs sont obligatoires' }
            : (existCategory === null || existCategory === void 0 ? void 0 : existCategory.length)
                ? await this.productRepository.save(product)
                : { error: `La catégorie ${product.category} n'existe pas` };
    }
    async addCategory(category) {
        const exist = await this.categoryRepository.findBy(category);
        return (exist === null || exist === void 0 ? void 0 : exist.length)
            ? { error: `La catégorie ${category.name} existe déjà` }
            : await this.categoryRepository.save(category);
    }
    async getCategory(category) {
        const exist = await this.categoryRepository.findBy({ id: category });
        return (exist === null || exist === void 0 ? void 0 : exist.length)
            ? await backEndFormatter_1.BackendFormatter.logger(this.productRepository.find({ where: { category } }))
            : { error: `La catégorie ${category} n'existe pas` };
    }
    async getCategories() {
        const categories = await this.categoryRepository
            .createQueryBuilder('category')
            .select('*')
            .addSelect('(SELECT COUNT(*) FROM products WHERE products.category = category.id) AS count')
            .getRawMany();
        categories.unshift({
            id: 'all',
            name: 'Toutes',
            count: categories.reduce((acc, cur) => acc + +cur.count, 0),
        });
        return categories;
    }
    async deleteProduct(id) {
        const exist = await this.productRepository.find({ where: { id } });
        return (exist === null || exist === void 0 ? void 0 : exist.length)
            ? await backEndFormatter_1.BackendFormatter.logger(this.productRepository.delete(id))
            : { error: `Le produit ${id} n'existe pas` };
    }
    async updateProduct(product) {
        const exist = await this.productRepository.findBy({ id: product.id });
        const existCategory = await this.categoryRepository.findBy({
            id: product.category,
        });
        return (exist === null || exist === void 0 ? void 0 : exist.length)
            ? (existCategory === null || existCategory === void 0 ? void 0 : existCategory.length)
                ? await this.productRepository.save(product)
                : {
                    error: `La catégorie ${product.category} n'existe pas`,
                }
            : { error: `Le produit ${product.id} n'existe pas` };
    }
};
CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=catalog.service.js.map