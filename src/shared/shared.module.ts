import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityService } from './entity.service'
import { AccountEntity } from './entity/account.entity'
import { SessionEntity } from './entity/session.entity'
import { UserEntity } from './entity/user.entity'
import { VerificationTokenEntity } from './entity/verification.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      UserEntity,
      SessionEntity,
      VerificationTokenEntity
    ])
  ],
  providers: [EntityService],
  exports: [EntityService]
})
export class SharedModule {}
