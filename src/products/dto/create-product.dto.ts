import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  descricao?: string;

  @IsNumber()
  @Min(0)
  preco: number;
}
