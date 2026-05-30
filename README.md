# Журнал операций на стройке

Веб-приложение для учета строительных операций с CRUD функционалом и фильтрацией.

## Быстрый старт

### Предварительные требования

- Docker
- Docker Compose
- Make (опционально)

### Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone git@github.com:SLVNV015/construction-report.git
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

## Технологии

- **Монорепо**: NX
- **Бэкенд**: NestJS + TypeORM + PostgreSQL
- **Валидация**: Zod
- **Фронтенд**: React + Vite + Tailwind CSS
- **Контейнеризация**: Docker + Docker Compose

Чтобы выбрана монорепа - ну раз все на ноде то почему бы не пошарить типы. Бекенд nestjs - удобство DI декораторы, не нужно инжектить все зависисмости руками. TypeORM как удобная вещь, можно и призму затянуть было. Валидация zod общая для всех, в последее время как то zod удобнее чем class-validator. Nest собирается webpack в один бандл. Фронт vite react tailwnd, next не захотелось тянуть ради одной страницы. Попытка сделать в стиле 1с. Есть функционал для добавления рандомных записей, что бы руками не забивать. Все контейнерируется в докер. Контейнер для фронта это nginx который раздает сбилженый бандл реакта.

## Функционал

- CRUD операций на стройке
- Виды работ (предзаданные + возможность добавления своих)
- Объем работ с единицами измерения
- Фильтрация по датам, работникам, видам работ
- Интерфейс в стиле 1С (желто-белая цветовая схема)

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

