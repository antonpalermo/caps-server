import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'
import { Doc } from './entities/doc.entity'

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(Doc)
    private docRepo: Repository<Doc>
  ) {}

  async getDoc(id: string): Promise<Doc> {
    const article = await this.docRepo.findOne(id)
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

  async getDocs() {
    let data: Doc[]
    try {
      data = await this.docRepo.query(`
        SELECT 
          id,
          doc::jsonb->'content'->0->'content'->0->'text' AS title,
          CASE WHEN doc::jsonb->'content'->1 <@ '{"type": "description"}'::jsonb THEN doc::jsonb->'content'->2->'content'->0->'text'
          ELSE doc::jsonb->'content'->1->'content'->0->'text'
          END description,
          date_created, 
          date_updated
        FROM docs;
        `)
    } catch (err) {
      throw new InternalServerErrorException({
        resource: 'Article',
        query: 'GET_ALL_AVAILABLE_ARTICLES'
      })
    }
    return data
  }

  async createDoc(article: CreateDocDto): Promise<Doc> {
    return await this.docRepo.save(article)
  }

  async updateDoc(article: UpdateDocDto): Promise<Doc> {
    return await this.docRepo.save({ id: article.id, ...article })
  }

  async deleteDoc(id: string): Promise<Doc> {
    const {
      raw: [article]
    } = await this.docRepo
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
