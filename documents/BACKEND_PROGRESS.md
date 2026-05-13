# BACKEND_PROGRESS

## Current Backend Path

- `backend/ContactApi`

## What Was Implemented

### 1. Program wiring
- Updated `backend/ContactApi/Program.cs` to:
  - import routes extension (`using ContactApi.routes;`)
  - keep OpenAPI setup (`builder.Services.AddOpenApi();`)
  - map API routes via `app.MapApiRoutes();`
  - remove template weather route usage

### 2. Route module
- Added route mapping in `backend/ContactApi/routes/routes.cs`
- Introduced grouped API routes under `/api`
- Added:
  - `GET /api/health`
  - `POST /api/contact`

### 3. Contact payload model
- Added `ContactRequest` model in `routes.cs` with:
  - `Name`
  - `Email`
  - `Message`

### 4. Basic validation
- `POST /api/contact` currently checks required fields (`Name`, `Email`, `Message`)
- Returns:
  - `400 BadRequest` when missing required values
  - `200 OK` when accepted

### 5. Build artifact protection
- `.gitignore` updated to ignore .NET build output:
  - `**/bin/`
  - `**/obj/`

## How To Run Backend

From repo root:

```bash
dotnet restore backend/ContactApi/ContactApi.csproj
dotnet run --project backend/ContactApi/ContactApi.csproj
```

You should see Kestrel start and print local URLs (example: `http://localhost:5236` and/or `https://localhost:7xxx`).

## How To Test Routes

### Health
```bash
curl http://localhost:5236/api/health
```

Expected response:
```json
{"ok":true,"service":"ContactAPI"}
```

### Contact (valid)
```bash
curl -X POST http://localhost:5236/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"AJ","email":"aj@example.com","message":"Hello from portfolio"}'
```

### Contact (invalid / missing fields)
```bash
curl -X POST http://localhost:5236/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"","message":""}'
```

## How To Stop / Terminate Port

### If running in current terminal
- Press `Ctrl + C`

### If process is detached or from another terminal

Kill by HTTP port (example `5236`):

```bash
kill -9 $(lsof -ti :5236)
```

If HTTPS port is also running (example `7000` range), kill that one too:

```bash
kill -9 $(lsof -ti :7000)
```

## Notes Before Render Deployment

- Commit source code only; do not commit `bin/` or `obj/`.
- Ensure Render build uses:
  - restore: `dotnet restore`
  - build: `dotnet build`
  - start: `dotnet run --project backend/ContactApi/ContactApi.csproj` (or published output command)
- Current backend is MVP-level; next recommended upgrades:
  - proper email format validation
  - anti-spam/rate limiting
  - persistence layer (DB)
  - service/repository separation
