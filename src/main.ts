import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// configuraçoes do servidor.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM Backend API')
    .setDescription(
      'API do sistema CRM criado para consolidar meus conhecimentos em desenvolvimento backend.',
    )
    .setContact(
      'André César Henrique',
      'https://github.com/andrecesarhdev',
      'andrecesarhenrique@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // ajuste para horario do brasil
  process.env.TZ = '-03:00';

  // adiciona validação em toda entrada de dados
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // limita ou libera acesso aos serviços da minha api/backend
  app.enableCors();

  // abertura de portas para receber dados.
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
