CREATE TABLE IF NOT EXISTS test_runs (
    id TEXT PRIMARY KEY,
    owner_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    protocol TEXT NOT NULL,
    endpoint_host TEXT NOT NULL,
    models_json TEXT NOT NULL,
    prompts_count INTEGER NOT NULL DEFAULT 0,
    rounds INTEGER NOT NULL DEFAULT 1,
    total_tests INTEGER NOT NULL DEFAULT 0,
    successful_tests INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_test_runs_owner_created
    ON test_runs(owner_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id TEXT NOT NULL,
    model TEXT NOT NULL,
    prompt_hash TEXT,
    round INTEGER NOT NULL DEFAULT 1,
    first_token_ms REAL,
    output_speed REAL,
    status TEXT NOT NULL,
    error_code TEXT,
    FOREIGN KEY (run_id) REFERENCES test_runs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_test_results_run
    ON test_results(run_id);

CREATE TABLE IF NOT EXISTS shared_reports (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    protocol TEXT NOT NULL,
    endpoint_host TEXT NOT NULL,
    report_json TEXT NOT NULL
);
