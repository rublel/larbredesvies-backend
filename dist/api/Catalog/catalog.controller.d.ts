import { Category } from 'src/models/category.entity';
import { Product } from 'src/models/product.entity';
import { Response } from 'src/utils/Formatter/response.entity';
import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    getAllProducts(query: any): Promise<Response<Product[]>>;
    getProduct(id: number): Promise<Response<Product>>;
    getCategory(id: number): Promise<Response<any>>;
    getCategories(): Promise<Response<any>>;
    addCategory(categoryData: Category): Promise<Response<Category>>;
    addProduct(productData: Product): Promise<Response<Product>>;
    updateProduct(productData: Product): Promise<Response<Product>>;
    deleteProduct(id: number): Promise<Response<Product>>;
}
