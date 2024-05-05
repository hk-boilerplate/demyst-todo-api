import { NotFound } from "../../src/api/constants/errors";
import { getTodoById } from "../../src/api/repo/todo";

describe("getTodoById repo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return todo when todoId is found", async () => {
    const todoId = 1;
    const mockTodo = { id: 1, title: "Task 1", status: true };

    const result = await getTodoById(todoId);

    expect(result).toEqual(mockTodo);
  });

  test("should throw NotFound error when todoId is not found", async () => {
    const todoId = 99;

    await expect(getTodoById(todoId)).rejects.toThrow(NotFound);
  });
});
