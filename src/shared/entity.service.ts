import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AccountEntity } from './entity/account.entity'
import { SessionEntity } from './entity/session.entity'
import { UserEntity } from './entity/user.entity'
import { VerificationTokenEntity } from './entity/verification.entity'

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepo: Repository<SessionEntity>,
    @InjectRepository(SessionEntity)
    private readonly accountRepo: Repository<AccountEntity>,
    @InjectRepository(VerificationTokenEntity)
    private readonly verificationRepo: Repository<VerificationTokenEntity>
  ) {}

  get user(): Repository<UserEntity> {
    return this.userRepo
  }

  get session(): Repository<SessionEntity> {
    return this.sessionRepo
  }

  get account(): Repository<AccountEntity> {
    return this.accountRepo
  }

  get verification(): Repository<VerificationTokenEntity> {
    return this.verificationRepo
  }
}
