import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Response } from 'src/utils/Formatter/response.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(query): Promise<{
    data: Product[];
    total: number;
    perPage: number;
  }> {
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

  public getProduct(id: number): Promise<Product[] | Response<string>> {
    return this.productRepository.findBy({ id });
  }

  public async addProduct(product: Product): Promise<Response<Product>> {
    return await BackendFormatter.logger(this.productRepository.save(product));
  }

  public async getCategory(category: string): Promise<Response<Product>> {
    return await BackendFormatter.logger(
      this.productRepository.findBy({ category }),
    );
  }

  public async getCategories(): Promise<Response<any>> {
    return await BackendFormatter.logger(
      this.productRepository
        .createQueryBuilder('products')
        .select('category', 'category')
        .addSelect('COUNT(*)', 'count')
        .groupBy('category')
        .getRawMany(),
    );
  }

  public async deleteProduct(id: number): Promise<Response<any>> {
    return await BackendFormatter.logger(this.productRepository.delete({ id }));
  }

  public async updateProduct(product: Product): Promise<Response<any>> {
    return {
      ...(await this.productRepository.update(product.id, product)),
      ...(await BackendFormatter.logger(this.getProduct(product.id))),
    };
  }
}
