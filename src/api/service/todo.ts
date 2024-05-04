import { Todo } from "../models/todo";
import * as repo from "../repo/todo";

export async function getTodoById(todoId: number): Promise<Todo> {
  return await repo.getTodoById(todoId);
}
