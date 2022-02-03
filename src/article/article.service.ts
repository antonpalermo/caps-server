import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Article } from './entities/article.entity'

import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepositort: Repository<Article>
  ) {}

  async createArticle(article: CreateArticleDto): Promise<Article> {
    return await this.articleRepositort.save(article)
  }

  async updateArticle(id: string, article: UpdateArticleDto): Promise<Article> {
    return await this.articleRepositort.save({ id, ...article })
  }
}
