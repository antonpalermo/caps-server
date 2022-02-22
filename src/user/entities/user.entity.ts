import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @CreateDateColumn({ name: 'date_created', type: 'timestamptz' })
  dateCreated: Date

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamptz' })
  dateUpdated: Date
}
