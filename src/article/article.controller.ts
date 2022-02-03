import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'

import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller({ path: 'article', version: '1' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles(): Promise<Article[]> {
    return this.articleService.getArticles()
  }

  @Get()
  async getArticle(@Query('id') id: string): Promise<Article | undefined> {
    return await this.articleService.findArticleById(id)
  }

  @Post('publish')
  async publishArticle(@Body() data: CreateArticleDto): Promise<Article> {
    return await this.articleService.createArticle(data)
  }

  @Post('update')
  async updateArticle(@Body() data: UpdateArticleDto): Promise<Article> {
    return await this.articleService.updateArticle(data)
  }
}
