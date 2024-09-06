import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['projectId', 'environment', 'severity'])
export class ErrorEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @Index()
  message: string;

  @Column('text')
  stack: string;

  @CreateDateColumn()
  @Index()
  timestamp: Date;

  @Column('text')
  url: string;

  @Column('text')
  userAgent: string;

  @Column('text')
  @Index()
  projectId: string;

  @Column('text')
  @Index()
  environment: string;

  @Column({
    type: 'text',
  })
  @Index()
  severity: 'low' | 'medium' | 'high' | 'critical';

  @Column('simple-json')
  metadata: { [key: string]: any };
}