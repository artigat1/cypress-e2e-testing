import * as faker from 'faker';

import { TodoFactory } from './todo.factory';

describe('Todo Factory', () => {
    describe('single()', () => {
        it('should return a single todo object with fake data', () => {
            const result = TodoFactory.single();

            expect(result).not.toBeNull();

            expect(result.title).not.toBeNull();
            expect(result.id).not.toBeNull();
            expect(result.complete).not.toBeNull();

            expect(typeof result.title).toBe('string');
            expect(typeof result.id).toBe('string');
            expect(typeof result.complete).toBe('boolean');
        });
    });

    describe('many()', () => {
        it('should default to 3 objects', () => {
            const result = TodoFactory.many();

            expect(result).not.toBeNull();
            expect(result.length).toBe(3);
            expect(typeof result[0]).toBe('object');
        });

        it('should return the requested number of objects', () => {
            const count = faker.random.number(10);

            const result = TodoFactory.many(count);

            expect(result).not.toBeNull();
            expect(result.length).toBe(count);
        });
    });
});
