import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('create')
  async create(@Body() data: CreateUserDto): Promise<any> {
    await this.userSrv.create(data)
  }
}
