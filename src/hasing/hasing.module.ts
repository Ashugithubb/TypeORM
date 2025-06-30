import { Module } from '@nestjs/common';
import { HasingService } from './hasing.service';
import { UsersModule } from 'src/twitter/users/users.module';

@Module({
  
  providers: [HasingService],
  exports:[HasingService]
})
export class HasingModule {

}
