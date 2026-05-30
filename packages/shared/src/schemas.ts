import { z } from 'zod';

const baseOperationObject = z.object({
  startTime: z.iso.datetime({ message: 'Неверный формат времени начала' }),
  endTime: z.iso.datetime({ message: 'Неверный формат времени окончания' }),
  workerName: z.string().min(1, 'ФИО обязательно').max(255),
  workerPosition: z.string().min(1, 'Должность обязательна').max(255),
  volume: z.number().positive('Объем должен быть положительным числом'),
  unit: z.string().min(1, 'Единица измерения обязательна').max(50),
  workTypeId: z.uuid('Неверный формат ID'),
});

export const createOperationSchema = baseOperationObject.refine(
  (data) => new Date(data.endTime) >= new Date(data.startTime),
  {
    message: 'Время окончания должно быть позже времени начала',
    path: ['endTime'],
  },
);

export const updateOperationSchema = baseOperationObject.partial().refine(
  (data) => {
    if (data.startTime && data.endTime) {
      return new Date(data.endTime) >= new Date(data.startTime);
    }
    return true;
  },
  {
    message: 'Время окончания должно быть позже времени начала',
    path: ['endTime'],
  },
);

export const createWorkTypeSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(255),
});

export const filterOperationsSchema = z.object({
  dateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  dateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  workerName: z.string().optional(),
  workTypeId: z.uuid().optional(),
});

export type CreateOperationDto = z.infer<typeof createOperationSchema>;
export type UpdateOperationDto = z.infer<typeof updateOperationSchema>;
export type CreateWorkTypeDto = z.infer<typeof createWorkTypeSchema>;
export type FilterOperationsDto = z.infer<typeof filterOperationsSchema>;
