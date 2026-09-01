# Cloudflare Worker + D1

This Worker serves the static frontend and stores anonymous cloud performance history in D1.
It deliberately stores endpoint hosts and performance metrics only. API keys,
raw prompts, and model responses are not persisted.

## Deploy

1. Install Wrangler and authenticate:

   ```bash
   npm install
   npx wrangler login
   ```

2. Create the D1 database and copy its ID into `wrangler.toml`:

   ```bash
   npx wrangler d1 create llm_api
   ```

3. Set `account_id`, `ALLOWED_ORIGIN`, and the D1 `database_id` in `wrangler.toml`.

4. Initialize the schema and deploy the frontend plus API:

   ```bash
   npx wrangler d1 execute llm_api --remote --file=schema.sql
   npx wrangler deploy
   ```

5. Open the deployed Worker URL, for example
   `https://llm-api-test-history.example.workers.dev`.

The Worker exposes `GET`, `POST`, and `DELETE` routes under `/api/runs`.
The browser-generated anonymous client ID is hashed before it is stored in D1.
