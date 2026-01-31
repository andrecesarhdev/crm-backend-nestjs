import { CategoryResponseDto } from './category-response.dto';
import { UserResponseDto } from './user-response.dto';

export class ProductResponseDto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  status: string;
  categoria: CategoryResponseDto;
  usuarioCriador: UserResponseDto;
  createdAt: Date;
}
