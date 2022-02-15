import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DocController } from './doc.controller'
import { DocService } from './doc.service'

import { Doc } from './entities/doc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Doc])],
  controllers: [DocController],
  providers: [DocService]
})
export class DocModule {}
