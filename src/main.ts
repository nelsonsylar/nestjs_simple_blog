import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';
import { HttpExecptionFilter } from './filters/http-execption/http-execption.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局使用拦截器
  // app.useGlobalFilters(new HttpExecptionFilter()); // 全局使用筛选器
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('blog-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document); // swaggerUI localhost:3000/swagger-doc swaggerJSON localhost:3000/swagger-doc-json

  await app.listen(3000);
}
bootstrap();
