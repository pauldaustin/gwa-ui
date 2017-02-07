return {
  {
    name = "2016-01-23-123000_api_enabled",
    up = [[
      CREATE TABLE IF NOT EXISTS api_enabled(
        id uuid not null,
        api_id uuid not null REFERENCES apis (id) ON DELETE CASCADE,
        enabled boolean not null,
        created_at timestamp without time zone default (CURRENT_TIMESTAMP(0) at time zone 'utc'),
        PRIMARY KEY (id)
      );

      DO $$
      BEGIN
        IF (SELECT to_regclass('api_enabled_api_id_idx')) IS NULL THEN
          CREATE INDEX api_enabled_api_id_idx ON api_enabled(api_id);
        END IF;
      END$$;
    ]],
    down =  [[
      DROP TABLE api_enabled;
    ]]
  }
}
