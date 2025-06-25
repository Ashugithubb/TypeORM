import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../user/entity/user.entity";
export class MainSeeder implements Seeder{
    public async run(dataSource: DataSource, 
        factoryManager: SeederFactoryManager): Promise<any> {
         
            const userFactory = factoryManager.get(User);

            const users = await userFactory.saveMany(10);
             
    }
}