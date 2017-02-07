return {
  {
    name = "2016-01-23-123000_api_enabled",
    up = [[
       CREATE TABLE IF NOT EXISTS api_enabled(
        id uuid,
        consumer_id uuid,
        enabled boolean,
        created_at timestamp,
        PRIMARY KEY (id)
      );

      CREATE INDEX IF NOT EXISTS api_enabled_api_id ON api_enabled(api_id);
    ]],
    down = [[
      DROP TABLE api_enabled;
    ]]
  }
}
