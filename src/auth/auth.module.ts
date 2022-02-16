import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
