import { InvalidId, NotFound } from "../constants/errors";
import { Todo } from "../models/todo";
import axios from 'axios';

export async function getTodoById(todoId: number): Promise<Todo> {
  try {
    if (todoId % 2 !== 0) {
      throw InvalidId;
    }

    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (error === InvalidId) {
      console.error(`Error fetching TODO with ID ${todoId}:`, error);
      throw new Error("Only even numbered todos can be fetched");
    } else {
      console.error(`Error fetching TODO with ID ${todoId}:`, error);
      throw NotFound;
    }
  }
}
