import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

import { verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async validate(identity: string, password: string): Promise<Partial<User>> {
    const isEmail = identity.includes('@')

    const { password: pass, ...rest } = await this.userRepo.findOne({
      where: isEmail ? { email: identity } : { username: identity }
    })

    const validPassword = await verify(pass, password)

    if (!(rest && validPassword)) {
      throw new UnauthorizedException()
    }

    return rest
  }
}
