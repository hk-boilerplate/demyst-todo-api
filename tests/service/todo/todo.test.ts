import { Todo } from "../../../src/api/models/todo";
import * as repo from "../../../src/api/repo/todo";
import { getTodoById } from "../../../src/api/service/todo";

jest.mock('../../../src/api/repo/todo');

describe('getTodoById service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return todo when repo call is successful', async () => {
    const todoId = 1;
    const mockTodo: Todo = { id: 1, title: 'Mock Todo', status: false };

    (repo.getTodoById as jest.Mock).mockResolvedValue(mockTodo);

    const result = await getTodoById(todoId);

    expect(repo.getTodoById).toHaveBeenCalledWith(todoId);
    expect(result).toEqual(mockTodo);
  });

  test('should throw error when repo call fails', async () => {
    const todoId = 1;
    
    (repo.getTodoById as jest.Mock).mockRejectedValue(new Error('Repository error'));

    await expect(getTodoById(todoId)).rejects.toThrow('Repository error');
    expect(repo.getTodoById).toHaveBeenCalledWith(todoId);
  });
});