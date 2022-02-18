import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { AuthService } from './auth.service'
import { JwtConfigService } from './jwt.service'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  providers: [AuthService, LocalStrategy, JwtConfigService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
