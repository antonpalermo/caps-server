import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'

import { User } from './entities/user.entity'
import { AuthModule } from 'src/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from './jwt.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtConfigService, JwtStrategy]
})
export class UserModule {}
