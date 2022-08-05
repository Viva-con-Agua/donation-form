.PHONY: serve build

build:
	docker-compose build --force-rm --no-cache

build-dev:
	docker-compose -f docker-compose.dev.yml build --force-rm --no-cache

serve-dev:
	docker-compose -f docker-compose.dev.yml up -d