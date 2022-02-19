import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

import { verify } from 'argon2'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

export enum TokenType {
  access = 'access_token',
  refresh = 'refresh_token'
}

export type Payload = {
  id: string
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtSrv: JwtService,
    private readonly configSrv: ConfigService
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

  async sign(payload: Payload, option?: JwtSignOptions): Promise<string> {
    return await this.jwtSrv.signAsync(payload, option)
  }

  async createToken(payload: Payload, type: TokenType): Promise<string> {
    let token: string
    if (type === TokenType.access) token = await this.sign(payload)
    if (type === TokenType.refresh)
      token = await this.sign(payload, {
        secret: this.configSrv.get<string>('JWT_REFRESH_SECRET')
      })
    return token
  }
}
