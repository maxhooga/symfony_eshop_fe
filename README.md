# Symfony E-shop — Frontend

React + TypeScript + Vite. Napojeno na Symfony REST API.

## Požadavky

- Docker Desktop / Docker Engine + Compose v2
- Běžící backend API (viz [`symfony_eshop_be`](../symfony_eshop_be))

## Spuštění celého projektu

### 1. Backend (v prvním terminálu)

```bash
cd symfony_eshop_be
docker compose up --build -d
```

API: http://localhost:8000

Volitelně načti testovací produkty:

```bash
docker compose exec app php bin/console doctrine:fixtures:load --no-interaction
```

### 2. Frontend (v druhém terminálu)

```bash
cd symfony_eshop_fe
docker compose up --build
```

E-shop: http://localhost:5173

## Spuštění pouze frontendu (Docker)

Backend musí už běžet (Docker nebo lokálně na portu `8000`).

```bash
docker compose up --build
```

Frontend proxy `/api` → `http://host.docker.internal:8000`

### Užitečné příkazy

```bash
# Na pozadí
docker compose up --build -d

# Logy
docker compose logs -f

# Zastavit
docker compose down
```

### Jiný port backendu

```bash
VITE_PROXY_TARGET=http://host.docker.internal:8080 docker compose up --build
```

## Lokální vývoj (bez Dockeru)

```bash
npm install
npm run dev
```

Backend musí běžet na http://127.0.0.1:8000 — Vite proxy `/api` funguje automaticky.

## Troubleshooting

| Problém | Řešení |
|---------|--------|
| Port `5173` obsazený | Zastav lokální `npm run dev` nebo `APP_PORT=5174 docker compose up` |
| API neodpovídá | Ověř, že backend běží: `curl http://localhost:8000/api/products` |
| Prázdný košík / CORS | Backend i frontend musí běžet; používej http://localhost:5173 |
