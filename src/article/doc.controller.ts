import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query
} from '@nestjs/common'

import { DocService } from './doc.service'
import { Doc } from './entities/doc.entity'

import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'

@Controller({ path: 'doc', version: '1' })
export class DocController {
  constructor(private readonly docSrv: DocService) {}

  @Get()
  /**
   * get all available articles
   */
  async getDocs(): Promise<Doc[]> {
    return this.docSrv.getDocs()
  }

  @Get('get')
  /**
   * get article base on the id provided
   */
  async getDoc(@Query('id') id: string): Promise<Doc | undefined> {
    return await this.docSrv.getDoc(id)
  }

  @Post('publish')
  /**
   * create a new article base on the provided data.
   */
  async createDoc(@Body() data: CreateDocDto): Promise<Record<string, any>> {
    const doc = await this.docSrv.createDoc(data)
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
  async updateDoc(@Body() data: UpdateDocDto): Promise<Doc> {
    return await this.docSrv.updateDoc(data)
  }

  @Post('delete')
  /**
   * remove selected article
   */
  async deleteDoc(@Query('id') id: string): Promise<Doc> {
    return await this.docSrv.deleteDoc(id)
  }
}
