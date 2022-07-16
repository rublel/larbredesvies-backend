import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('product')
  getProduct(@Query('reference') reference: number): Product {
    return this.catalogService.getProduct(reference);
  }

  @Get('products')
  getProducts(): string {
    return 'Hello Worlddddd!';
  }
}
