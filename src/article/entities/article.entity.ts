import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Doc } from './doc-content'

@Entity({ name: 'articles' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'jsonb' })
  content: Doc

  @CreateDateColumn({ type: 'timestamptz' })
  dataCreated: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated: Date
}
