import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// OBJETIVO DO LoginDto
// Definir exatamente o que o backend aceita no login
export class LoginDto {
  @ApiProperty({
    example: 'admin@empresa.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
