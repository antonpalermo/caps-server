import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { transformer } from '../utils/transformer'
import { UserEntity } from './user.entity'

@Entity({ name: 'sessions' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  sessionToken!: string

  @Column({ type: 'uuid' })
  userId!: string

  @Column({ transformer: transformer.date })
  expires!: string

  @ManyToOne(() => UserEntity, user => user.sessions)
  user!: UserEntity
}
