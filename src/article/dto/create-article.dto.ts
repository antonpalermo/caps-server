import { Doc } from '../entities/doc-content'

export class CreateArticleDto {
  title: string
  description: string
  content: Doc
}
