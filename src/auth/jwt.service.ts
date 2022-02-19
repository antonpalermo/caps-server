import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configSrv: ConfigService) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configSrv.get<string>('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: '60s'
      }
    }
  }
}
