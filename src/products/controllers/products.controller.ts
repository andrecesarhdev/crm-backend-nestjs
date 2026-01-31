import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':categoryId/:userId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('categoryId') categoryId: number,
    @Param('userId') userId: number,
    @Body() body: CreateProductDto,
  ) {
    return this.productsService.create(body, categoryId, userId);
  }

  @Get()
  findAll(
    @Query('status') status?: ProductStatus,
    @Query('categoryId') categoryId?: number,
  ) {
    return this.productsService.findAll(status, categoryId);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productsService.findById(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }
  @Patch(':id/inactivate')
  inactivate(@Param('id') id: number) {
    return this.productsService.inactivate(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: number) {
    return this.productsService.activate(id);
  }
}
