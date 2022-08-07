import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Customer } from 'src/models/customer.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('all')
  async getCustomers(@Query() query) {
    const response = await this.customerService.getCustomers(query);
    return FrontEndFormatter.format({ records: response });
  }

  @Get()
  async getCustomer(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.getCustomer(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('purchase')
  async getCustomerPurchase(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.getCustomerOrders(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Post('search')
  async searchCustomer(
    @Body() customerData: { queryString: string; queryFilters: {} },
  ): Promise<any> {
    const response = await this.customerService.searchCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Post()
  async addCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.addCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Put()
  async updateCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.updateCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Delete()
  async deleteCustomer(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.deleteCustomer(id);
    return await FrontEndFormatter.format({ records: response });
  }
}
