import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    let user: User
    const { password, ...rest } = data

    const hashPassword = await hash(password)

    try {
      user = await this.userRepo.save({ password: hashPassword, ...rest })
    } catch (err) {
      throw new InternalServerErrorException()
    }
    return user
  }
}
