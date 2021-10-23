import mocker from 'mocker-data-generator';
import faker from 'faker';
import { endOfMonth, startOfMonth } from 'date-fns';

const startOfThisMonth = startOfMonth(new Date()).toISOString();
const endOfThisMonth = endOfMonth(new Date()).toISOString();

console.log('faker', faker);

const categories = ['Category A', 'Category B', 'Category C', 'Category D'];

const moment = {
  id: {
    faker: 'datatype.uuid',
  },
  title: {
    faker: 'lorem.words(3)',
  },
  scheduledAt: {
    function: function () {
      return this.faker.date
        .between(startOfThisMonth, endOfThisMonth)
        .toISOString();
    },
  },
  position: {
    faker: 'datatype.number',
  },
  image: {
    function: function () {
      return this.faker.image.image(
        this.faker.datatype.number({ min: 100, max: 1000 }),
        this.faker.datatype.number({ min: 100, max: 1000 }),
        true
      );
    },
  },
  categories: {
    function: function () {
      return this.faker.random.arrayElements(
        categories,
        this.faker.datatype.number({ min: 0, max: categories.length })
      );
    },
  },
};

export const makeMoments = (count: number): Promise<any> => {
  return mocker()
    .schema('moment', moment, count)
    .build(function (error, data) {
      if (error) {
        throw error;
      }
      return data;
    });
};
