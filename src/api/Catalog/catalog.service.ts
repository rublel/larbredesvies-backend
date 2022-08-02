import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public getAllProducts(): Promise<any> {
    return BackendFormatter.logger(this.productRepository.find());
  }

  public async getProducts(): Promise<any> {
    return await BackendFormatter.logger(this.productRepository.find());
  }

  public async getProduct(id: number): Promise<any> {
    return await BackendFormatter.logger(this.productRepository.findBy({ id }));
  }

  public async addProduct(product: Product): Promise<any> {
    return await BackendFormatter.logger(this.productRepository.save(product));
  }

  public async getCategory(category: string): Promise<any> {
    return await BackendFormatter.logger(
      this.productRepository.findBy({ category }),
    );
  }

  public async getCategories(): Promise<any> {
    return await BackendFormatter.logger(
      this.productRepository
        .createQueryBuilder('products')
        .select('category', 'category')
        .addSelect('COUNT(*)', 'count')
        .groupBy('category')
        .getRawMany(),
    );
  }

  public async deleteProduct(id: number): Promise<any> {
    return await BackendFormatter.logger(this.productRepository.delete({ id }));
  }

  public async updateProduct(product: Product): Promise<any> {
    return {
      ...(await this.productRepository.update(product.id, product)),
      ...(await BackendFormatter.logger(this.getProduct(product.id))),
    };
  }
}
