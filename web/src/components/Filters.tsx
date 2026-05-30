import { useState } from 'react';
import { FilterOperationsDto, WorkType } from '../api/client';

interface FiltersProps {
  workTypes: WorkType[];
  onFilter: (filters: FilterOperationsDto) => void;
}

export function Filters({ workTypes, onFilter }: FiltersProps) {
  const [filters, setFilters] = useState<FilterOperationsDto>({});

  const handleApply = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="bg-1c-beige border-2 border-1c-border rounded p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Фильтры</h3>
      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Дата от
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-1c-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Дата до
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-1c-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Работник
          </label>
          <input
            type="text"
            value={filters.workerName || ''}
            onChange={(e) => setFilters({ ...filters, workerName: e.target.value })}
            placeholder="Поиск по ФИО"
            className="w-full px-2 py-1 text-sm border border-1c-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Вид работ
          </label>
          <select
            value={filters.workTypeId || ''}
            onChange={(e) => setFilters({ ...filters, workTypeId: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-1c-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
          >
            <option value="">Все</option>
            {workTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleApply}
          className="px-4 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 border border-1c-border rounded transition-colors font-medium"
        >
          Применить
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-1 text-sm bg-white hover:bg-gray-100 border border-1c-border rounded transition-colors"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
