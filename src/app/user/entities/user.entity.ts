import { Column, Entity } from 'typeorm';

@Entity('users')
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
