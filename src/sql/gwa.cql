CREATE KEYSPACE
  gwa
IF NOT EXISTS
WITH REPLICATION = { 
   'class' : 'NetworkTopologyStrategy', 
   'datacenter1' : 1 
};

DROP TABLE gwa.end_point;
DROP TYPE gwa.api_key;

CREATE TYPE IF NOT EXISTS
  gwa.api_key (
  id             uuid,
  user_title     text,
  developer_key  boolean,
  enabled        boolean,
  rate_limit     text
);

CREATE TABLE IF NOT EXISTS
  gwa.end_point (
  id                    uuid,
  title                 text,
  created_by            text,
  upstream_username     text,
  upstream_password     text,
  enabled               boolean,
  rate_limit            text,
  api_keys              list<frozen<api_key>>,
  PRIMARY KEY (id)
);
CREATE INDEX created_by
   ON gwa.end_point (created_by);
