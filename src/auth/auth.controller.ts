import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req)
    return req.user
  }
}
