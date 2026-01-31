import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  // criar uma categoria
  async create(category: Partial<Category>): Promise<Category> {
    const novaCategoria = this.categoryRepository.create(category);
    return this.categoryRepository.save(novaCategoria);
  }
  // buscar todas as categorias
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  // buscar categoria por id
  async findById(id: number): Promise<Category> {
    const categoria = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return categoria;
  }

  async toggleStatus(id: number): Promise<Category> {
    const categoria = await this.findById(id);

    categoria.ativo = !categoria.ativo;

    return this.categoryRepository.save(categoria);
  }
}
