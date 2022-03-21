export interface ICreateVideoRequestDTO {
  name: string;
  description: string;
  duration: number;
  category_id: string;
  url?: string;
  key?: string;
  file_name?: string;
  size?: number;
}