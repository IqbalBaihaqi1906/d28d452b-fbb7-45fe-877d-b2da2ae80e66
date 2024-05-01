import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 25 })
  position: string;

  @Column({ length: 25 })
  phone: string;

  @Column({
    unique: true,
  })
  email: string;
}
