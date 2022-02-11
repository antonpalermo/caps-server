import { IsNotEmpty } from 'class-validator'

import { Doc } from '../entities/doc-content'

export class CreateArticleDto {
  @IsNotEmpty()
  doc: Doc
}
