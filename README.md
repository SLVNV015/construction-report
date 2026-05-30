# Журнал операций на стройке

Веб-приложение для учета строительных операций с CRUD функционалом и фильтрацией.

## Технологии

- **Монорепо**: NX
- **Бэкенд**: NestJS + TypeORM + PostgreSQL
- **Валидация**: Zod
- **Фронтенд**: React + Vite + Tailwind CSS
- **Контейнеризация**: Docker + Docker Compose

Чтобы выбрана монорепа - ну раз все на ноде то почему бы не пошарить типы. Бекенд nestjs - удобство DI декораторы, не нужно инжектить все зависисмости руками. TypeORM как удобная вещь, можно и призму затянуть было. Валидация zod общая для всех, в последее время как то zod удобнее чем class-validator. Nest собирается webpack в один бандл. Фронт vite react tailwnd, next не захотелось тянуть ради одной страницы.

## Функционал

- CRUD операций на стройке
- Виды работ (предзаданные + возможность добавления своих)
- Объем работ с единицами измерения
- Фильтрация по датам, работникам, видам работ
- Интерфейс в стиле 1С (желто-белая цветовая схема)

## Быстрый старт

### Предварительные требования

- Docker
- Docker Compose
- Make (опционально)

### Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd construction-report
```

2. Скопируйте файл с переменными окружения:
```bash
cp .env.example .env
```

3. Соберите и запустите проект:
```bash
make build
make up
```

Или без Make:
```bash
docker-compose build
docker-compose up -d
```

4. Откройте в браузере:
- **Веб-интерфейс**: http://localhost
- **API**: http://localhost:3000/api
- **Swagger**: http://localhost:3000/api/docs

### Makefile команды

```bash
make help       # Показать все доступные команды
make build      # Собрать Docker образы
make up         # Запустить все сервисы
make down       # Остановить все сервисы
make restart    # Перезапустить все сервисы
make clean      # Остановить и удалить контейнеры, сети и volumes
```

## Структура проекта

```
construction-report/
├── api/                      # NestJS бэкенд
│   └── src/
│       └── app/
│           ├── entities/     # TypeORM сущности
│           ├── dto/          # Zod валидация
│           ├── services/     # Бизнес-логика
│           ├── controllers/  # REST API endpoints
│           └── pipes/        # Валидация пайпы
├── web/                      # React фронтенд
│   └── src/
│       ├── api/              # API клиент
│       ├── components/       # React компоненты
│       └── app/              # Главный компонент
├── packages/                 # Shared общие типы и схемы
│   └── src/
│       ├── index/            # экспорты
│       ├── schemas/          # схемы zod 
│       └── types/            # общие типы
├── dockerfile.api            # Dockerfile для бэкенда
├── dockerfile.web            # Dockerfile для фронтенда
├── docker-compose.yaml       # Docker Compose конфигурация
├── nginx.conf                # Nginx конфигурация
├── Makefile                  # Make команды
├── .env                      # Переменные окружения
└── .env.example              # Пример переменных окружения
```

## API Endpoints

### Операции
- `GET /api/operations` - Получить все операции (с фильтрами)
- `GET /api/operations/:id` - Получить операцию по ID
- `POST /api/operations` - Создать операцию
- `PATCH /api/operations/:id` - Обновить операцию
- `DELETE /api/operations/:id` - Удалить операцию

### Виды работ
- `GET /api/work-types` - Получить все виды работ
- `POST /api/work-types` - Создать вид работ
- `DELETE /api/work-types/:id` - Удалить вид работ

## Фильтры операций

Параметры запроса для `GET /api/operations`:
- `dateFrom` - Дата от (YYYY-MM-DD)
- `dateTo` - Дата до (YYYY-MM-DD)
- `workerName` - Поиск по ФИО работника
- `workTypeId` - UUID вида работ

## Предзаданные виды работ

При первом запуске автоматически создаются следующие виды работ:
- Малярные работы
- Кладка кирпича
- Штукатурные работы
- Бетонные работы
- Монтаж конструкций
- Электромонтажные работы
- Сантехнические работы
- Кровельные работы

## Разработка

### Локальная разработка без Docker

1. Установите зависимости:
```bash
npm install --legacy-peer-deps
```

2. Запустите PostgreSQL локально или через Docker:
```bash
docker run -d \
  --name postgres \
  -e POSTGRES_USER=construction_user \
  -e POSTGRES_PASSWORD=construction_pass \
  -e POSTGRES_DB=construction_report \
  -p 5432:5432 \
  postgres:16-alpine
```

3. Обновите `.env`:
```bash
DB_HOST=localhost
VITE_API_URL=http://localhost:3000/api
```

4. Запустите бэкенд:
```bash
npm exec nx serve api
```

5. Запустите фронтенд:
```bash
npm exec nx serve web
```

## Переменные окружения

См. `.env.example` для полного списка переменных окружения.

