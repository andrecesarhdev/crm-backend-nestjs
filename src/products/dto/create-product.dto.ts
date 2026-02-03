import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Reparo Emergencial' })
  nome: string;

  @IsOptional()
  @ApiProperty({
    example:
      'Manutencção corretiva, reestabelecimento do fornecimento de energia',
  })
  descricao?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 3500 })
  preco: number;
}
