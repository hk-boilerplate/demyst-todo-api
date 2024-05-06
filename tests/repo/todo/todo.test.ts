import { NotFound } from "../../../src/api/constants/errors";
import { getTodoById } from "../../../src/api/repo/todo";

describe("getTodoById repo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return todo when even todoId is found", async () => {
    const evenTodoId = 2;
    const mockEvenTodo = { id: 2, title: "Task 2", status: false };

    const result = await getTodoById(evenTodoId);

    expect(result).toEqual(mockEvenTodo);
  });

  test("should throw NotFound error when odd todoId is found", async () => {
    const oddTodoId = 1;

    await expect(getTodoById(oddTodoId)).rejects.toThrow(NotFound);
  });

  test("should throw NotFound error when todoId is not found", async () => {
    const nonExistentTodoId = 99;

    await expect(getTodoById(nonExistentTodoId)).rejects.toThrow(NotFound);
  });
});