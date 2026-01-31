import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { ProductController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User])],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductModule {}
