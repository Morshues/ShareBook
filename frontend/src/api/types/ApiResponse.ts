export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message: string | null;
  errors: string[] | null;
}