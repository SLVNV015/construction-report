-- Изменение структуры таблицы operations: замена date на start_time и end_time
ALTER TABLE operations
  DROP COLUMN IF EXISTS date,
  ADD COLUMN start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Добавляем проверку что end_time >= start_time
ALTER TABLE operations
  ADD CONSTRAINT check_time_range CHECK (end_time >= start_time);

-- Обновляем индексы
DROP INDEX IF EXISTS idx_operations_date;
CREATE INDEX idx_operations_start_time ON operations(start_time);
CREATE INDEX idx_operations_end_time ON operations(end_time);
