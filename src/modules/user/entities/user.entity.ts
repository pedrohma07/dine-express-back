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
import { Address } from 'src/modules/address/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['admin', 'manager', 'client', 'attendant'] })
  role: string;

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
