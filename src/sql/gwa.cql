CREATE KEYSPACE IF NOT EXISTS
  gwa
WITH REPLICATION = { 
   'class' : 'NetworkTopologyStrategy', 
   'datacenter1' : 1 
};

DROP TABLE gwa.api;
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
  gwa.api (
  id                    uuid,
  title                 text,
  created_by            text,
  upstream_username     text,
  upstream_password     text,
  enabled               boolean,
  rate_limit            text,
  PRIMARY KEY (id)
);
CREATE INDEX api_created_by
   ON gwa.api (created_by);
