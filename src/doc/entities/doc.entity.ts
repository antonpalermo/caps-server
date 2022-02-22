import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Doc as DocContent } from './doc-content'

@Entity({ name: 'docs' })
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'jsonb' })
  doc: DocContent

  @CreateDateColumn({ name: 'date_created', type: 'timestamptz' })
  dateCreated: Date

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamptz' })
  dateUpdated: Date
}
