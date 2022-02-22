import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

import { UserService } from './user.service'

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Get()
  async user(@Query('id') id: string): Promise<User | undefined> {
    return await this.userSrv.user(id)
  }

  @Get('all')
  async users(): Promise<Partial<User>[]> {
    return await this.userSrv.users()
  }

  @Post('create')
  async create(@Body() data: CreateUserDto): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.userSrv.create(data)
    return rest
  }

  @Patch('update')
  async update(
    @Query('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<User> {
    return await this.userSrv.update(id, data)
  }
}
