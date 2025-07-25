# Trois pions
___

## Requirements

Trois pions requires Docker.


## How to set up the project

#### Step 1 : Environment variables
In the `back/` directory:
Copy the `.env.example` file and rename it to `.env`.  

In the `front/` directory:
Copy the `.env.example` file and rename it to `.env`.


#### Step 2 : Build images and run containers
Run `make build`
If you haven't `make` installed on your PC, run the command: `docker compose up -d --build`