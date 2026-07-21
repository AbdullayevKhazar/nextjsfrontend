type ResponseError = {
  response?: {
    data?: {
      message?: unknown;
    };
  };
};

export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const responseError = error as ResponseError;
    const message = responseError.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
