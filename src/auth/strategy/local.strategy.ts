import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authSrv: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.authSrv.validate(username, password)
  }
}
