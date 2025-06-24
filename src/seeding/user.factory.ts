import { setSeederFactory } from 'typeorm-extension';
import { User } from '../user/entity/user.entity';
import { faker } from '@faker-js/faker';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.age = faker.number.int({ min: 18, max: 60 });
  user.password = faker.internet.password();

  return user;
});




















// import { setSeederFactory } from "typeorm-extension";
// import { User } from "../entity/user.entity";
// import { Faker } from "@faker-js/faker/.";

// export const UserFactory = setSeederFactory(User,(faker:typeof Faker)=>{
//     const user : new User();
//     user.firstName = faker.person.firstName();
//     user.lastName = faker.person.lastName();
//     user.email = faker.internet.email();
//     user.age = faker.number.age();
//     user.password = faker.person.password()

//     return user
// } )