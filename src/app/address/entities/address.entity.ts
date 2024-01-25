import { User } from 'src/app/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  zip: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
