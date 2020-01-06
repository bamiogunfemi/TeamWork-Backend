import faker from 'faker';

const newArticle = {
  title: faker.lorem.sentence(),
  article: faker.lorem.text(),
};

const updatedArticle = {
  title: faker.lorem.sentence(20),
  article: faker.lorem.text(20),
};

export { newArticle, updatedArticle };
