# Variable Definitions
BACKEND_API := backend
FRONTEND := frontend
DATABASE := db

# Docker Compose Command
DOCKER_COMPOSE := docker compose

up:
	$(DOCKER_COMPOSE) up -d

build:
	$(DOCKER_COMPOSE) up -d --build

down:
	$(DOCKER_COMPOSE) down

clean:
	$(DOCKER_COMPOSE) down -v

sh_back:
	$(DOCKER_COMPOSE) exec $(BACKEND_API) bash

sh_front:
	$(DOCKER_COMPOSE) exec $(FRONTEND) bash

sh_db:
	$(DOCKER_COMPOSE) exec $(DATABASE) bash

init_db:
	$(DOCKER_COMPOSE) exec -it $(BACKEND_API) php src/migrations/migrate_schema.php