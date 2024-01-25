import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';
import { Address } from 'src/app/address/entities/address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeInsert()
  generetedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  @OneToOne(() => Address, {
    cascade: true, // Isso permite que as operações de persistência (save, update) afetem também a entidade relacionada (Address).
    eager: true, // Isso carrega automaticamente a entidade relacionada quando você carrega um User do banco de dados.
  })
  @JoinColumn()
  address: Address;
}
