import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';

import { Todo, TodoFactory } from '@steve/models';
import { TodoDataService } from './todo-data.service';

describe('ToDo Data Service', () => {
    let sut: TodoDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        sut = TestBed.get(TodoDataService);
    });

    it('should be created', () => {
        expect(sut).toBeTruthy();
    });

    describe('getAllTodos()', () => {
        it('should return an empty array by default', () => {
            expect(sut.getAllTodos()).toEqual([]);
        });

        it('should return all todos', () => {
            const todo1 = new Todo({ title: 'Hello 1', complete: false });
            const todo2 = new Todo({ title: 'Hello 2', complete: true });

            sut.addTodo(todo1);
            sut.addTodo(todo2);

            expect(sut.getAllTodos()).toEqual([todo1, todo2]);
        });
    });

    describe('save(todo)', () => {
        it('should automatically assign an incrementing id', () => {
            const todos: Todo[] = TodoFactory.many(2);

            sut.addTodo(todos[0]);
            sut.addTodo(todos[1]);

            expect(sut.getTodoById(todos[0].id)).toEqual(todos[0]);
            expect(sut.getTodoById(todos[1].id)).toEqual(todos[1]);
        });
    });

    describe('deleteTodoById(id)', () => {
        it('should remove todo with the corresponding id', () => {
            const todos: Todo[] = TodoFactory.many(2);

            sut.addTodo(todos[0]);
            sut.addTodo(todos[1]);
            expect(sut.getAllTodos()).toEqual([todos[0], todos[1]]);

            sut.deleteTodoById(todos[0].id);
            expect(sut.getAllTodos()).toEqual([todos[1]]);

            sut.deleteTodoById(todos[1].id);
            expect(sut.getAllTodos()).toEqual([]);
        });

        it('should not removing anything if todo with corresponding id is not found', () => {
            const todo1 = new Todo({ title: 'Hello 1', complete: false });
            const todo2 = new Todo({ title: 'Hello 2', complete: true });

            sut.addTodo(todo1);
            sut.addTodo(todo2);

            expect(sut.getAllTodos()).toEqual([todo1, todo2]);
            sut.deleteTodoById(3);
            expect(sut.getAllTodos()).toEqual([todo1, todo2]);
        });
    });

    describe('updateTodoById(id, values)', () => {
        it('should return todo with the corresponding id and updated data', () => {
            const todo: Todo = TodoFactory.single();
            sut.addTodo(todo);

            const updatedTitle = faker.random.words(faker.random.number(10));
            const updatedTodo = sut.updateTodoById(todo.id, {
                title: updatedTitle
            });

            expect(updatedTodo.title).toEqual(updatedTitle);
        });

        it('should return null if todo is not found', () => {
            const todo: Todo = TodoFactory.single();
            sut.addTodo(todo);

            const updatedTodo = sut.updateTodoById(faker.random.number(), {
                title: faker.random.words(faker.random.number(10))
            });

            expect(updatedTodo).toEqual(null);
        });
    });

    describe('toggleTodoComplete(todo)', () => {
        it('should return the updated todo with inverse complete status', () => {
            const todo = new Todo({
                title: faker.random.words(faker.random.number(10)),
                complete: false
            });
            sut.addTodo(todo);

            const updatedTodo = sut.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(true);
            sut.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(false);
        });
    });
});
