import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleInfoVO, ArticleInfoResponse } from './vo/article-info.vo';
import { ArticleListResponse, ArticleListVO } from './vo/article-list.vo';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  @ApiOkResponse({ description: '文章列表', type: ArticleListResponse })
  getMore(@Query() listDTO: ListDTO) {
    return this.articleService.getMore(listDTO);
  }

  @Get('info')
  @ApiOkResponse({ description: '文章详情', type: ArticleInfoResponse })
  GetOne(@Query() IdDTO: IdDTO) {
    console.log(IdDTO);
    return this.articleService.getOne(IdDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '创建文章', type: ArticleInfoResponse })
  create(@Body() ArticleCreateDto: ArticleCreateDTO) {
    return this.articleService.create(ArticleCreateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('edit')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '编辑文章', type: ArticleInfoResponse })
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoResponse })
  delete(@Body() IdDto: IdDTO) {
    return this.articleService.delete(IdDto);
  }
}
