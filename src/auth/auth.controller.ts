import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService, Payload, TokenType } from './auth.service'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('authenticate')
  async authenticate(): Promise<string> {
    // TODO: return refresh token
    return ''
  }

  @Post('refresh_token')
  async sendRefreshToken(@Body() body: Payload, @Res() res: Response) {
    const refresh_token = await this.authSrv.createToken(
      body,
      TokenType.refresh
    )

    res.cookie('jit', refresh_token, {
      httpOnly: true
    })

    return res
      .status(201)
      .send({ mssage: 'Refresh Token successfully created', refresh_token })
  }
}
