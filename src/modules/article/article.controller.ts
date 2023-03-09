import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getMore(@Query() listDTO: ListDTO) {
    return this.articleService.getMore(listDTO);
  }

  @Get('info')
  GetOne(@Query() IdDTO: IdDTO) {
    console.log(IdDTO);
    return this.articleService.getOne(IdDTO);
  }

  @Post('create')
  create(@Body() ArticleCreateDto: ArticleCreateDTO) {
    return this.articleService.create(ArticleCreateDto);
  }

  @Post('edit')
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  @Post('remove')
  delete(@Body() IdDto: IdDTO) {
    return this.articleService.delete(IdDto);
  }
}
