import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async user(id: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'username', 'dateCreated', 'dateUpdated']
    })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async users(): Promise<Partial<User>[]> {
    const findAll = await this.userRepo.find()

    const users = findAll.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        dateCreated: user.dateCreated,
        dateUpdated: user.dateUpdated
      }
    })

    return users
  }

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

  async update(id: string, data: Partial<UpdateUserDto>): Promise<User> {
    let user: User
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data

    if (await this.user(id)) {
      try {
        user = await this.userRepo.save({ id, ...rest })
      } catch (err) {
        throw new InternalServerErrorException()
      }
    }

    return user
  }
}
