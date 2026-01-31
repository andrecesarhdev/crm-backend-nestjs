import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// OBJETIVO DO LoginDto
// Definir exatamente o que o backend aceita no login
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
