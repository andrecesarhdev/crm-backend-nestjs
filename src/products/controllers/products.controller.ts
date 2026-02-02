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
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/enums/user-role.enum';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductsService } from '../services/products.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':categoryId')
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  create(
    @Param('categoryId') categoryId: number,
    @Body() body: CreateProductDto,
    @CurrentUser() user: { id: number; email: string; role: UserRole },
  ) {
    return this.productsService.create(body, categoryId, user.id);
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
