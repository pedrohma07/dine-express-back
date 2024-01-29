import { User } from 'src/app/modules/user/entities/user.entity';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('restaurant')
export class Restaurant extends User {
  @PrimaryColumn('varchar')
  cnpj: string;
}
