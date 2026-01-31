import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { ProductStatus } from '../enums/product-status.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
  })
  status: ProductStatus;

  @ManyToOne(() => Category)
  categoria: Category;

  @ManyToOne(() => User)
  usuarioCriador: User;

  @CreateDateColumn()
  createdAt: Date;
}
