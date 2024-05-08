import axios from 'axios';
import { getTodoById } from '../../../src/api/repo/todo';
import { Todo } from '../../../src/api/models/todo';

jest.mock('axios');

describe('getTodoById repo', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should fetch todo successfully for even todoId', async () => {
    const todoId = 2;
    const todo: Todo = { userId: 1, id: todoId, title: 'Test Todo', completed: false };
    const response = { status: 200, data: todo };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);

    const result = await getTodoById(todoId);

    expect(result).toEqual(todo);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  });

  test('should throw InvalidId error for odd todoId', async () => {
    const todoId = 3;
    const expectedErrorMessage = 'Only even numbered todos can be fetched';

    await expect(getTodoById(todoId)).rejects.toThrowError(expectedErrorMessage);
    expect(axios.get).not.toHaveBeenCalled();
  });

  test('should throw NotFound error if HTTP response status is not 200', async () => {
    const todoId = 4;
    const response = { status: 404 };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);
    const expectedErrorMessage = `HTTP error! Status: ${response.status}`;

    await expect(getTodoById(todoId)).rejects.toThrowError(expectedErrorMessage);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  });
});