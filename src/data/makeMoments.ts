import mocker from 'mocker-data-generator';
import { inspect } from 'util';
import faker from 'faker';
import { endOfWeek, startOfWeek } from 'date-fns';

const startOfThisWeek = startOfWeek(new Date()).toISOString();
const endOfThisWeek = endOfWeek(new Date()).toISOString();

console.log('faker', faker);

const moment = {
  id: {
    faker: 'datatype.uuid',
  },
  title: {
    faker: 'lorem.words(3)',
  },
  scheduled_at: {
    function: function () {
      return this.faker.date
        .between(startOfThisWeek, endOfThisWeek)
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
};

export const makeMoments = (count: number): Promise<any> => {
  return mocker()
    .schema('moment', moment, count)
    .build(function (error, data) {
      if (error) {
        throw error;
      }
      console.log(inspect(data, { depth: 10 }));
      return data;
    });
};
