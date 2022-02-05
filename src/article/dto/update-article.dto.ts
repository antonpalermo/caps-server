import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateArticleDto } from './create-article.dto'

export class UpdateArticleDto extends CreateArticleDto {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
