import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>
  ) {}

  async getArticle(id: string): Promise<Article> {
    const article = await this.articleRepo.findOne(id)
    if (!article) {
      throw new HttpException(
        {
          resource: 'Article',
          query: id,
          message: "The requested resource is not available at the moment :'("
        },
        HttpStatus.NOT_FOUND
      )
    }
    return article
  }

  async getArticles(): Promise<Article[]> {
    return await this.articleRepo.find({
      select: ['id', 'title', 'description', 'dataCreated', 'dateUpdated']
    })
  }

  async createArticle(article: CreateArticleDto): Promise<Article> {
    return await this.articleRepo.save(article)
  }

  async updateArticle(article: UpdateArticleDto): Promise<Article> {
    return await this.articleRepo.save({ id: article.id, ...article })
  }

  async deleteArticle(id: string): Promise<Article> {
    const {
      raw: [article]
    } = await this.articleRepo
      .createQueryBuilder()
      .delete()
      .whereInIds(id)
      .returning(['id', 'title', 'description', 'dataCreated', 'dateUpdated'])
      .execute()

    if (!article) {
      throw new HttpException(
        {
          resource: 'Article',
          query: id,
          message: "The requested resource is not available at the moment :'("
        },
        HttpStatus.NOT_FOUND
      )
    }

    return article
  }
}
