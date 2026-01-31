import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { ProductResponseDto } from '../dto/product-response.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../enums/product-status.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(
    data: Partial<Product>,
    categoryId: number,
    userId: number,
  ): Promise<ProductResponseDto> {
    const categoria = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const usuario = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const status =
      data.preco && data.preco > 0
        ? ProductStatus.ATIVO
        : ProductStatus.INATIVO;

    const produto = this.productRepository.create({
      ...data,
      status,
      categoria,
      usuarioCriador: usuario,
    });
    const produtoSalvo = await this.productRepository.save(produto);
    return this.mapToResponse(produtoSalvo);
  }
  private mapToResponse(product: Product): ProductResponseDto {
    return {
      id: product.id,
      nome: product.nome,
      descricao: product.descricao,
      preco: Number(product.preco),
      status: product.status,
      createdAt: product.createdAt,
      categoria: {
        id: product.categoria.id,
        nome: product.categoria.nome,
      },
      usuarioCriador: {
        id: product.usuarioCriador.id,
        nome: product.usuarioCriador.nome,
        role: product.usuarioCriador.role,
      },
    };
  }

  // Se status existir o metodo filtra, se nao retorna todos
  async findAll(
    status?: ProductStatus,
    categoryId?: number,
  ): Promise<ProductResponseDto[]> {
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoria = { id: categoryId };
    }

    const products = await this.productRepository.find({
      where,
      relations: ['categoria', 'usuarioCriador'],
    });

    return products.map((product) => this.mapToResponse(product));
  }

  async findById(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuarioCriador'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.mapToResponse(product);
  }

  async update(
    id: number,
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuarioCriador'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Atualiza somente os campos enviados
    if (data.nome !== undefined) {
      product.nome = data.nome;
    }

    if (data.descricao !== undefined) {
      product.descricao = data.descricao;
    }

    if (data.preco !== undefined) {
      product.preco = data.preco;

      // Recalcula o status automaticamente
      product.status =
        data.preco > 0 ? ProductStatus.ATIVO : ProductStatus.INATIVO;
    }

    const produtoAtualizado = await this.productRepository.save(product);

    return this.mapToResponse(produtoAtualizado);
  }
  // metodo criado para inativar o produto ao inves de apagar
  async inactivate(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuarioCriador'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    product.status = ProductStatus.INATIVO;

    const produtoInativado = await this.productRepository.save(product);

    return this.mapToResponse(produtoInativado);
  }
  //metodo criado para ativar o produto
  async activate(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuarioCriador'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    product.status = ProductStatus.ATIVO;

    const produtoAtivado = await this.productRepository.save(product);

    return this.mapToResponse(produtoAtivado);
  }
}
