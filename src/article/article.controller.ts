import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'

import { CreateArticleDto } from './dto/create-article.dto'

@Controller({ path: 'article', version: '1' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getArticle(@Query('id') id: string) {
    return 'is this your id ' + id
  }

  @Post('publish')
  async publishArticle(@Body() data: CreateArticleDto): Promise<Article> {
    return await this.articleService.createArticle(data)
  }
}
