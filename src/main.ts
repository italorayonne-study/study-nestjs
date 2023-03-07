import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  const config = new DocumentBuilder()
    .setTitle('Evento Externo')
    .setDescription('Api da Aplicação Evento Externo')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(PORT, () =>
    console.log(`Server is running at port ${PORT}`),
  );
}

bootstrap();
