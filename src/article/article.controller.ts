import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query
} from '@nestjs/common'

import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'

import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller({ path: 'article', version: '1' })
export class ArticleController {
  constructor(private readonly articleSrv: ArticleService) {}

  @Get()
  /**
   * get all available articles
   */
  async getArticles(): Promise<Article[]> {
    return this.articleSrv.getArticles()
  }

  @Get('get')
  /**
   * get article base on the id provided
   */
  async getArticle(@Query('id') id: string): Promise<Article | undefined> {
    return await this.articleSrv.getArticle(id)
  }

  @Post('publish')
  /**
   * create a new article base on the provided data.
   */
  async createArticle(
    @Body() data: CreateArticleDto
  ): Promise<Record<string, any>> {
    const doc = await this.articleSrv.createArticle(data)
    if (!doc) {
      throw new InternalServerErrorException({
        resource: 'Article',
        query: 'CREATE_ARTICLE_ERROR'
      })
    }

    return {
      id: doc.id,
      message: 'Document successfully published.'
    }
  }

  @Post('update')
  /**
   * update selected article
   */
  async updateArticle(@Body() data: UpdateArticleDto): Promise<Article> {
    return await this.articleSrv.updateArticle(data)
  }

  @Post('delete')
  /**
   * remove selected article
   */
  async deleteArticle(@Query('id') id: string): Promise<Article> {
    return await this.articleSrv.deleteArticle(id)
  }
}
