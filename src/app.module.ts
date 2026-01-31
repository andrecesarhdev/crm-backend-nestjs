import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'crm_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CategoriaModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
