import { NotFound } from "../constants/errors";
import { todoMockRepo } from "../mock/todo";
import { Todo } from "../models/todo";

export async function getTodoById(todoId: number): Promise<Todo> {
  const todos = todoMockRepo.filter((todoItem) => todoItem.id % 2 === 0);
  const result = todos.find((todoItem) => todoItem.id === todoId);
  if (result) {
    return result;
  } else {
    throw NotFound;
  }
}
