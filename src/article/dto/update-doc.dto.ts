import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateDocDto } from './create-doc.dto'

export class UpdateDocDto extends CreateDocDto {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
