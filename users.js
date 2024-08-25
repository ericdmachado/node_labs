import { faker } from '@faker-js/faker';

export const createRandomUser = () => {
  const person = faker.person;
  

  return {
    _id: faker.string.uuid(),
    name: person.fullName(),
    username: person.faker.internet.userName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    sexType: person.sexType(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, { count: 5});
