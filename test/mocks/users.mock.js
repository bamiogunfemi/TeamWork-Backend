import faker from 'faker';

const admin = {
  email: 'admin@teamwork.dev',
  password: 'secretadmin',
};

const staff = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: 'staff@teamwork.dev',
  password: 'secretuser',
  gender: 'male',
  jobRole: faker.name.jobTitle(),
  address: faker.address.streetAddress(),
  department: faker.name.jobArea(),
  isAdmin: false,
};

const newUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  jobRole: faker.name.jobTitle(),
  gender: 'male',
  department: faker.name.jobArea(),
  address: faker.address.streetAddress(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export { admin, newUser, staff };
