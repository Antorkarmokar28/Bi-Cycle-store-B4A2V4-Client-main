export type TError = {
      data: {
        message: string;
        stack: string;
        success: boolean;
      };
      status: number;
};

export type TResponse<T = unknown> = {
      data?: T;
      error?: TError;
      success: boolean;
      message: string;
};


