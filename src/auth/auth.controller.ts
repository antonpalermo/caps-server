import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { set } from './utils/cookie'
import { Credential } from './utils/credentials'
import { Token } from './utils/token'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('authenticate')
  async authenticate(
    @Body() credential: Credential,
    @Res() res: Response
  ): Promise<Record<string, any>> {
    const data = await this.authSrv.validate(credential)
    // set refresh token on set-cookie: refresh token
    set(
      res,
      await this.authSrv.createToken({ id: data.user.id }, Token.refresh)
    )

    return res.status(200).send(data)
  }
}
