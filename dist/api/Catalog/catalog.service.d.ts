import { Product } from 'src/models/product.entity';
import { Category } from 'src/models/category.entity';
import { Repository } from 'typeorm';
import { Response } from 'src/utils/Formatter/response.entity';
export declare class CatalogService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    getAllProducts(query: any): Promise<{
        data: Product[];
        total: number;
        perPage: number;
    }>;
    getProduct(id: number): Promise<Product[] | Response<any>>;
    addProduct(product: Product): Promise<Response<Product> | {}>;
    addCategory(category: Category): Promise<Response<Category> | {}>;
    getCategory(category: number): Promise<Response<Product[]>>;
    getCategories(): Promise<Response<any> | {}>;
    deleteProduct(id: number): Promise<Response<any>>;
    updateProduct(product: Product): Promise<Response<{}> | {}>;
}
