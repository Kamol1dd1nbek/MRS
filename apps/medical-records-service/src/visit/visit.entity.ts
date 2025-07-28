import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  visit_date: Date;
}
