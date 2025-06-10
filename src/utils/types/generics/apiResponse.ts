export interface ApiResponse<T> {
  message: string;
  response: boolean;
  data: T;
}
