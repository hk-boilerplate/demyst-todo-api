import {
  Responses,
  TypedRequest,
  TypedResponse,
} from "../../../typings/express";
import { InternalServerError, NotFound } from "../constants/errors";
import * as service from "../service/todo";
import { createErrorResponse } from "../utils/errors";

export async function getTodoById(
  req: TypedRequest["getTodoById"],
  res: TypedResponse<Responses["getTodoById"]>
) {
  try {
    const todoId = req.params.todoId;
    const result = await service.getTodoById(todoId);
    return res.status(200).json(result);
  } catch (err) {
    const errMessage = (err as any).message;
    if (errMessage && errMessage === NotFound.message) {
      return res
        .status(404)
        .json(createErrorResponse(404, NotFound.message, errMessage));
    } else {
      return res
        .status(500)
        .json(createErrorResponse(500, InternalServerError.message, errMessage));
    }
  }
}
