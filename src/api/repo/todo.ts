
import { NotFound } from "../constants/errors";
import { todoMockRepo } from "../mock/todo";
import { Todo } from "../models/todo";

export async function getTodoById(todoId: number): Promise<Todo> {
  const result = todoMockRepo.find((todoItem) => todoItem.id === todoId);
  if (result) {
    return result;
  } else throw NotFound;
}
