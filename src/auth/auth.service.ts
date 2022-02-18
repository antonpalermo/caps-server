import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

import { verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtSrv: JwtService
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

  async sign(user: User) {
    const payload = { id: user.id }
    return {
      access_token: await this.jwtSrv.signAsync(payload)
    }
  }
}
