import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
//import typeorm from 'typeorm' to getdatafrom mysql

@Injectable()
export class CatalogService {
  constructor() {}

  getProduct(reference: number): Product {
    return new Product({
      name: 'Product 1',
      reference,
      category: 'Category 3',
      price: '100',
    });
  }
}
