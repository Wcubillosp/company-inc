import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Company INC')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Wallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  const server = await app.listen(port, function () {
    console.log('app running on port 3000');
  });
}
bootstrap();
