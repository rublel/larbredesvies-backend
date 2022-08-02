import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { Response } from 'src/utils/Formatter/response.entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('all')
  async getAllProducts(): Promise<Response> {
    const response = await this.catalogService.getAllProducts();
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('products')
  async getProducts(): Promise<Response> {
    const response = await this.catalogService.getProducts();
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('product')
  async getProduct(@Query('id') id: number): Promise<Response> {
    const response = await this.catalogService.getProduct(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('category')
  async getCategory(@Query('category') category: string): Promise<Response> {
    const response = await this.catalogService.getCategory(category);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('categories')
  async getCategories(): Promise<Response> {
    const response = await this.catalogService.getCategories();
    return await FrontEndFormatter.format({ records: response });
  }

  @Post('product')
  async addProduct(@Body() productData: Product): Promise<Response> {
    const response = await this.catalogService.addProduct(productData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Put('product')
  async updateProduct(@Body() productData: Product): Promise<Response> {
    const response = await this.catalogService.updateProduct(productData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Delete('product')
  async deleteProduct(@Query('id') id: number): Promise<Response> {
    const response = await this.catalogService.deleteProduct(id);
    return await FrontEndFormatter.format({ records: response });
  }
}
