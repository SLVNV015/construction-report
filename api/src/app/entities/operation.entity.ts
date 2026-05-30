import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WorkType } from './work-type.entity';

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp', name: 'end_time' })
  endTime: Date;

  @Column({ name: 'worker_name' })
  workerName: string;

  @Column({ name: 'worker_position' })
  workerPosition: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  volume: number;

  @Column()
  unit: string;

  @ManyToOne(() => WorkType, { eager: true })
  @JoinColumn({ name: 'work_type_id' })
  workType: WorkType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
