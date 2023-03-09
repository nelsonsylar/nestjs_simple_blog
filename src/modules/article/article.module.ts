import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])], // 子module需要映射实体
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
