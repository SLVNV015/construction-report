import { useState, useEffect } from 'react';
import {
  operationsApi,
  workTypesApi,
  Operation,
  WorkType,
  CreateOperationDto,
  FilterOperationsDto,
} from '../api/client';
import { generageEvents } from '../api/generate.events';
import { OperationModal } from '../components/OperationModal';
import { OperationsTable } from '../components/OperationsTable';
import { Filters } from '../components/Filters';

export function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<Operation | null>(
    null,
  );
  const [filters, setFilters] = useState<FilterOperationsDto>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorkTypes();
    loadOperations();
  }, []);

  const loadWorkTypes = async () => {
    try {
      const response = await workTypesApi.getAll();
      setWorkTypes(response.data);
    } catch (error) {
      console.error('Ошибка загрузки видов работ:', error);
      alert('Не удалось загрузить виды работ');
    }
  };

  const loadOperations = async (filterParams?: FilterOperationsDto) => {
    setLoading(true);
    try {
      const response = await operationsApi.getAll(filterParams);
      setOperations(response.data);
    } catch (error) {
      console.error('Ошибка загрузки операций:', error);
      alert('Не удалось загрузить операции');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters: FilterOperationsDto) => {
    setFilters(newFilters);
    loadOperations(newFilters);
  };

  const handleCreateOperation = async (data: CreateOperationDto) => {
    try {
      if (editingOperation) {
        await operationsApi.update(editingOperation.id, data);
      } else {
        await operationsApi.create(data);
      }
      setIsModalOpen(false);
      setEditingOperation(null);
      loadOperations(filters);
    } catch (error) {
      console.error('Ошибка сохранения операции:', error);
      alert('Не удалось сохранить операцию');
    }
  };

  const handleEdit = (operation: Operation) => {
    setEditingOperation(operation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await operationsApi.delete(id);
      loadOperations(filters);
    } catch (error) {
      console.error('Ошибка удаления операции:', error);
      alert('Не удалось удалить операцию');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOperation(null);
  };

  const handleGenerateEvents = async () => {
    setLoading(true);
    try {
      await generageEvents();
      loadOperations(filters);
      alert('Успешно добавлено 30 случайных записей');
    } catch (error) {
      console.error('Ошибка генерации записей:', error);
      alert('Не удалось сгенерировать записи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-1c-yellow p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-1c-header border-2 border-1c-border rounded-t p-4 mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Журнал операций на стройке
          </h1>
        </div>

        <div className="bg-white border-2 border-t-0 border-1c-border rounded-b p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 border-2 border-1c-border rounded transition-colors font-semibold"
            >
              + Добавить операцию
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleGenerateEvents}
                disabled={loading}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 border-2 border-1c-border rounded transition-colors font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Добавить рандомных записей
              </button>
              <div className="text-sm text-gray-600">
                Всего записей:{' '}
                <span className="font-semibold">{operations.length}</span>
              </div>
            </div>
          </div>

          <Filters workTypes={workTypes} onFilter={handleFilter} />

          {loading ? (
            <div className="text-center py-8 text-gray-500">Загрузка...</div>
          ) : (
            <OperationsTable
              operations={operations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <OperationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOperation}
        workTypes={workTypes}
        initialData={
          editingOperation
            ? {
                startTime: new Date(editingOperation.startTime)
                  .toISOString()
                  .slice(0, 16),
                endTime: new Date(editingOperation.endTime)
                  .toISOString()
                  .slice(0, 16),
                workerName: editingOperation.workerName,
                workerPosition: editingOperation.workerPosition,
                volume: editingOperation.volume,
                unit: editingOperation.unit,
                workTypeId: editingOperation.workType.id,
                id: editingOperation.id,
              }
            : undefined
        }
      />
    </div>
  );
}

export default App;
