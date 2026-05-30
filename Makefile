.PHONY: help build up down restart logs logs-api logs-web logs-db clean

help:
	@echo "Construction Report - Makefile команды:"
	@echo ""
	@echo "  make build       - Собрать Docker образы"
	@echo "  make up          - Запустить все сервисы"
	@echo "  make down        - Остановить все сервисы"
	@echo "  make restart     - Перезапустить все сервисы"
	@echo "  make logs        - Показать логи всех сервисов"
	@echo "  make logs-api    - Показать логи API"
	@echo "  make logs-web    - Показать логи Web"
	@echo "  make logs-db     - Показать логи PostgreSQL"
	@echo "  make clean       - Остановить и удалить контейнеры, сети и volumes"
	@echo ""

build:
	@echo "Сборка Docker образов..."
	docker compose build

up:
	@echo "Запуск сервисов..."
	docker compose up -d
	@echo ""
	@echo "Сервисы запущены!"
	@echo "Web: http://localhost"
	@echo "API: http://localhost:3000/api"
	@echo ""

down:
	@echo "Остановка сервисов..."
	docker compose down

restart:
	@echo "Перезапуск сервисов..."
	docker compose restart

logs:
	docker compose logs -f

logs-api:
	docker compose logs -f api

logs-web:
	docker compose logs -f web

logs-db:
	docker compose logs -f postgres

clean:
	@echo "Очистка контейнеров, сетей и volumes..."
	docker compose down -v
	@echo "Очистка завершена!"
