import { ErrorResponse } from "../models/errors";

export function createErrorResponse(
  statusCode: number,
  message: string,
  errors: any
): ErrorResponse {
  return {
    statusCode,
    message,
    error: errors,
  };
}
