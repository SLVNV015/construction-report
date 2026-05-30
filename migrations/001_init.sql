-- Создание таблицы видов работ
CREATE TABLE IF NOT EXISTS work_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы операций
CREATE TABLE IF NOT EXISTS operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    worker_name VARCHAR(255) NOT NULL,
    worker_position VARCHAR(255) NOT NULL,
    volume DECIMAL(10,2) NOT NULL CHECK (volume > 0),
    unit VARCHAR(50) NOT NULL,
    work_type_id UUID NOT NULL REFERENCES work_types(id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_operations_date ON operations(date);
CREATE INDEX IF NOT EXISTS idx_operations_worker_name ON operations(worker_name);
CREATE INDEX IF NOT EXISTS idx_operations_work_type_id ON operations(work_type_id);

-- Вставка предзаданных видов работ
INSERT INTO work_types (name) VALUES
    ('Малярные работы'),
    ('Кладка кирпича'),
    ('Штукатурные работы'),
    ('Бетонные работы'),
    ('Монтаж конструкций'),
    ('Электромонтажные работы'),
    ('Сантехнические работы'),
    ('Кровельные работы'),
    ('Земляные работы'),
    ('Фундаментные работы'),
    ('Арматурные работы'),
    ('Опалубочные работы'),
    ('Гидроизоляционные работы'),
    ('Теплоизоляционные работы'),
    ('Отделочные работы'),
    ('Плиточные работы'),
    ('Стекольные работы'),
    ('Столярные работы'),
    ('Слесарные работы'),
    ('Сварочные работы'),
    ('Монтаж окон и дверей'),
    ('Устройство полов'),
    ('Устройство потолков'),
    ('Фасадные работы'),
    ('Ландшафтные работы')
ON CONFLICT (name) DO NOTHING;
