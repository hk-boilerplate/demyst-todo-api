import {
  InternalServerError,
  NotFound,
} from "../../../src/api/constants/errors";
import { getTodoById } from "../../../src/api/handlers/todo";
import * as service from "../../../src/api/service/todo";

jest.mock("../../../src/api/service/todo");

describe("todoHandler", () => {
  const mockRequest = { params: { todoId: 1 } };
  let mockResponse: any;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return todo when service call is successful", async () => {
    // Mock the implementation of getTodoById function
    (service.getTodoById as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Task 1",
      completed: false,
    });

    await getTodoById(mockRequest as any, mockResponse as any);

    expect(service.getTodoById).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      title: "Task 1",
      completed: false,
    });
  });

  test("should return 404 error when todo is not found", async () => {
    (service.getTodoById as jest.Mock).mockRejectedValue(NotFound);

    await getTodoById(mockRequest as any, mockResponse as any);

    expect(service.getTodoById).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "not found",
      statusCode: 404,
      message: NotFound.message,
    });
  });

  test("should return 500 error when an internal server error occurs", async () => {
    // Mock the implementation of getTodoById function to throw an error
    (service.getTodoById as jest.Mock).mockRejectedValue(InternalServerError);

    await getTodoById(mockRequest as any, mockResponse as any);

    expect(service.getTodoById).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal server error",
      statusCode: 500,
      message: InternalServerError.message,
    });
  });
});
