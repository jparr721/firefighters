export const API_V1_URL = "http://localhost:8000";
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
