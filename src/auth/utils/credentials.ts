import { IsNotEmpty } from 'class-validator'

export class Credential {
  @IsNotEmpty()
  identity: string

  @IsNotEmpty()
  password: string
}
