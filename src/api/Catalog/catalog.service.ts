import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { Category } from 'src/models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Response } from 'src/utils/Formatter/response.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

  public async getProduct(id: number): Promise<Product[] | Response<any>> {
    const product = await this.productRepository.findBy({ id });
    return product.length
      ? product
      : {
          error: `Le produit ${id} n'existe pas`,
        };
  }

  public async addProduct(product: Product): Promise<Response<Product>> {
    return !product.price ||
      !product.name ||
      !product.reference ||
      !product.category
      ? { error: 'Tout les champs sont obligatoires' }
      : BackendFormatter.logger(this.productRepository.save(product));
  }

  public async addCategory(
    category: Category,
  ): Promise<Response<Category> | {}> {
    const exist = await this.categoryRepository.findBy(category);
    return exist?.length
      ? { error: `La catégorie ${category.name} existe déjà` }
      : await this.categoryRepository.save(category);
  }

  public async getCategory(category: number): Promise<Response<Product[]>> {
    return await BackendFormatter.logger(
      this.productRepository.find({
        where: { category: category },
      }),
    );
  }

  public async getCategories(): Promise<Response<any>> {
    return await BackendFormatter.logger(
      this.categoryRepository
        .createQueryBuilder('category')
        .select('*')
        .addSelect(
          '(SELECT COUNT(*) FROM products WHERE products.category = category.id) AS count',
        )
        .getRawMany(),
    );
  }

  public async deleteProduct(id: number): Promise<Response<any>> {
    const exist = await this.productRepository.find({ where: { id } });
    return exist?.length
      ? await BackendFormatter.logger(this.productRepository.delete(id))
      : { error: `Le produit ${id} n'existe pas` };
  }

  public async updateProduct(product: Product): Promise<Response<any>> {
    const exist = await this.productRepository.findBy({ id: product.id });
    return exist?.length
      ? await BackendFormatter.logger(this.productRepository.save(product))
      : { error: `Le produit ${product.id} n'existe pas` };
  }
}
