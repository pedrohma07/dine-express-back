import { User } from 'src/app/modules/user/entities/user.entity';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('client')
export class Client extends User {
  @PrimaryColumn('varchar')
  cpf: string;
}
