import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'

import { User } from 'src/user/entities/user.entity'
import { Credential } from './utils/credentials'
import { Token } from './utils/token'
import { set } from './utils/cookie'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtSrv: JwtService,
    private readonly configSrv: ConfigService
  ) {}

  async validate({
    identity,
    password: pass
  }: Credential): Promise<Record<string, any>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.userRepo.findOne({
      where: identity.includes('@')
        ? { email: identity }
        : { username: identity }
    })

    if (!(rest && (await verify(password, pass)))) {
      throw new UnauthorizedException()
    }

    return {
      user: rest,
      accessToken: await this.createToken({ id: rest.id }, Token.access)
    }
  }

  async createToken(payload: Partial<User>, token: Token): Promise<string> {
    const access_secret = this.configSrv.get<string>('JWT_ACCESS_SECRET')
    const refresh_secret = this.configSrv.get<string>('JWT_REFRESH_SECRET')

    return this.jwtSrv.signAsync(payload, {
      secret: token === Token.access ? access_secret : refresh_secret
    })
  }
}
