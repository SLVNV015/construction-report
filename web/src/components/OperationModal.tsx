import { useState, useEffect } from 'react';
import { createOperationSchema } from '@construction-report/shared';
import type { CreateOperationDto, WorkType } from '../api/client';
import { UNITS } from '../constants/units';

interface OperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateOperationDto) => void;
  workTypes: WorkType[];
  initialData?: CreateOperationDto & { id?: string };
}

export function OperationModal({
  isOpen,
  onClose,
  onSubmit,
  workTypes,
  initialData,
}: OperationModalProps) {
  const [formData, setFormData] = useState<CreateOperationDto>({
    startTime: new Date().toISOString().slice(0, 16),
    endTime: new Date().toISOString().slice(0, 16),
    workerName: '',
    workerPosition: '',
    volume: 0,
    unit: '',
    workTypeId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const now = new Date();
      setFormData({
        startTime: now.toISOString().slice(0, 16),
        endTime: new Date(now.getTime() + 3600000).toISOString().slice(0, 16),
        workerName: '',
        workerPosition: '',
        volume: 0,
        unit: '',
        workTypeId: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };

    const result = createOperationSchema.safeParse(dataToValidate);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(dataToValidate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-1c-yellow border-2 border-1c-border rounded shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {initialData?.id ? 'Редактирование операции' : 'Новая операция'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Время начала
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.startTime ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Время окончания
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.endTime ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Вид работ
              </label>
              <select
                value={formData.workTypeId}
                onChange={(e) =>
                  setFormData({ ...formData, workTypeId: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.workTypeId ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              >
                <option value="">Выберите вид работ</option>
                {workTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.workTypeId && (
                <p className="text-red-500 text-xs mt-1">{errors.workTypeId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Единица измерения
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.unit ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              >
                <option value="">Выберите единицу</option>
                {UNITS.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              {errors.unit && (
                <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ФИО работника
              </label>
              <input
                type="text"
                value={formData.workerName}
                onChange={(e) =>
                  setFormData({ ...formData, workerName: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.workerName ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              />
              {errors.workerName && (
                <p className="text-red-500 text-xs mt-1">{errors.workerName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Должность
              </label>
              <input
                type="text"
                value={formData.workerPosition}
                onChange={(e) =>
                  setFormData({ ...formData, workerPosition: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.workerPosition ? 'border-red-500' : 'border-1c-border'
                }`}
                required
              />
              {errors.workerPosition && (
                <p className="text-red-500 text-xs mt-1">{errors.workerPosition}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Объем работ
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.volume || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  volume: parseFloat(e.target.value) || 0,
                })
              }
              className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.volume ? 'border-red-500' : 'border-1c-border'
              }`}
              required
            />
            {errors.volume && (
              <p className="text-red-500 text-xs mt-1">{errors.volume}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-1c-border rounded bg-white hover:bg-gray-100 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border border-1c-border rounded transition-colors font-medium"
            >
              {initialData?.id ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
