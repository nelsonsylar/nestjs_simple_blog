import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';
import { HttpExecptionFilter } from './filters/http-execption/http-execption.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局使用拦截器
  app.useGlobalFilters(new HttpExecptionFilter()); // 全局使用筛选器
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
