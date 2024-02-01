import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/modules/client/client.service';
import { RestaurantService } from 'src/modules/restaurant/restaurant.service';

@Injectable()
class EmailChecker {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly clientService: ClientService,
  ) {}

  public async checkEmailExists(email: string): Promise<boolean> {
    const client = await this.clientService.findByEmail(email);
    console.log(client);

    const restaurant = await this.restaurantService.findByEmail(email);

    return client !== null || restaurant !== null;
  }
}
export default EmailChecker;
