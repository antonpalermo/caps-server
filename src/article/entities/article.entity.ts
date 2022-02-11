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

  @Column({ type: 'jsonb' })
  doc: Doc

  @CreateDateColumn({ name: 'date_created', type: 'timestamptz' })
  dateCreated: Date

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamptz' })
  dateUpdated: Date
}
