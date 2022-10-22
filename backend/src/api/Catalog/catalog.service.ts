import { Injectable } from '@nestjs/common';
import { Product } from 'backend/src/models/product.entity';
import { Category } from 'backend/src/models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'backend/src/utils/Formatter/backEndFormatter';
import { Response } from 'backend/src/utils/Formatter/response.entity';

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

  public async addProduct(product: Product): Promise<Response<Product> | {}> {
    const existCategory = await this.categoryRepository.findBy({
      id: product.category,
    });
    return !product.price ||
      !product.name ||
      !product.reference ||
      !product.category
      ? { error: 'Tout les champs sont obligatoires' }
      : existCategory?.length
      ? await this.productRepository.save(product)
      : { error: `La catégorie ${product.category} n'existe pas` };
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
    const exist = await this.categoryRepository.findBy({ id: category });
    return exist?.length
      ? await BackendFormatter.logger(
          this.productRepository.find({ where: { category } }),
        )
      : { error: `La catégorie ${category} n'existe pas` };
  }

  public async getCategories(): Promise<Response<any> | {}> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .select('*')
      .addSelect(
        '(SELECT COUNT(*) FROM products WHERE products.category = category.id) AS count',
      )
      .getRawMany();
    categories.unshift({
      id: 'all',
      name: 'Toutes',
      count: categories.reduce((acc, cur) => acc + +cur.count, 0),
    });
    return categories;
  }

  public async deleteProduct(id: number): Promise<Response<any>> {
    const exist = await this.productRepository.find({ where: { id } });
    return exist?.length
      ? await BackendFormatter.logger(this.productRepository.delete(id))
      : { error: `Le produit ${id} n'existe pas` };
  }

  public async updateProduct(product: Product): Promise<Response<{}> | {}> {
    const exist = await this.productRepository.findBy({ id: product.id });
    const existCategory = await this.categoryRepository.findBy({
      id: product.category,
    });

    return exist?.length
      ? existCategory?.length
        ? await this.productRepository.save(product)
        : {
            error: `La catégorie ${product.category} n'existe pas`,
          }
      : { error: `Le produit ${product.id} n'existe pas` };
  }
}
