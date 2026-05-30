import { Operation } from '../api/client';

interface OperationsTableProps {
  operations: Operation[];
  onEdit: (operation: Operation) => void;
  onDelete: (id: string) => void;
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function calculateDuration(start: string, end: string): string {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}ч ${minutes}м`;
}

export function OperationsTable({ operations, onEdit, onDelete }: OperationsTableProps) {
  return (
    <div className="overflow-x-auto border-2 border-1c-border rounded">
      <table className="w-full bg-white">
        <thead className="bg-1c-header border-b-2 border-1c-border">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Начало
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Окончание
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Длительность
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Вид работ
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Работник
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Должность
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Объем
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-1c-border">
              Ед. изм.
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {operations.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                Нет записей
              </td>
            </tr>
          ) : (
            operations.map((operation) => (
              <tr
                key={operation.id}
                className="border-b border-1c-border hover:bg-1c-hover transition-colors"
              >
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {formatDateTime(operation.startTime)}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {formatDateTime(operation.endTime)}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border font-medium">
                  {calculateDuration(operation.startTime, operation.endTime)}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {operation.workType.name}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {operation.workerName}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {operation.workerPosition}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {operation.volume}
                </td>
                <td className="px-4 py-3 text-sm border-r border-1c-border">
                  {operation.unit}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(operation)}
                      className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded transition-colors"
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Удалить запись?')) {
                          onDelete(operation.id);
                        }
                      }}
                      className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 border border-red-300 rounded transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
