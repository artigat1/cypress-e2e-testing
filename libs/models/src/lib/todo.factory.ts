import * as faker from 'faker';

import { Todo } from '@steve/models';


/**
 * Initialises {@link Todo} objects with fake data for testing purposes.
 */
export class TodoFactory {
  /**
   * Generate a single instance of the {@link Todo} object with fake data for testing.
   */
  static single(): Todo {
    const wordCount = faker.random.number(10);
    return {
      id: faker.random.uuid(),
      title: faker.random.words(wordCount),
      complete: faker.random.boolean()
    } as Todo;
  }

  /**
   * Generate a number of instances of the {@link Todo} object with fake data for testing.
   * @param count - defaults to 3
   */
  static many(count: number = 3): Todo[] {
    return Array(count)
      .fill(null)
      .map(this.single);
  }
}
