import axios from 'axios';
import type { Operation, WorkType, CreateOperationDto, FilterOperationsDto } from '@construction-report/shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export type { Operation, WorkType, CreateOperationDto, FilterOperationsDto };

export const operationsApi = {
  getAll: (filters?: FilterOperationsDto) =>
    api.get<Operation[]>('/operations', { params: filters }),
  getOne: (id: string) => api.get<Operation>(`/operations/${id}`),
  create: (data: CreateOperationDto) => api.post<Operation>('/operations', data),
  update: (id: string, data: Partial<CreateOperationDto>) =>
    api.patch<Operation>(`/operations/${id}`, data),
  delete: (id: string) => api.delete(`/operations/${id}`),
};

export const workTypesApi = {
  getAll: () => api.get<WorkType[]>('/work-types'),
  create: (name: string) => api.post<WorkType>('/work-types', { name }),
  delete: (id: string) => api.delete(`/work-types/${id}`),
};
