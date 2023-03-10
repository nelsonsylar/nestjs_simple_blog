import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/modules/article/article.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      //主模块连接数据库
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
