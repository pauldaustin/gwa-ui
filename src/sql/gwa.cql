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
  upstream_url          text,
  upstream_username     text,
  upstream_password     text,
  enabled               boolean,
  allowed_http_methods  list<text>,         
  rate_limit            text,
  api_keys              list<frozen<api_key>>,
  PRIMARY KEY (id)
);
CREATE INDEX created_by
   ON gwa.end_point (created_by);

INSERT INTO gwa.end_point (id,allowed_http_methods,api_keys,created_by,enabled,rate_limit,title,upstream_password,upstream_url,upstream_username) VALUES
(
  223e764f-a30d-43a1-91fa-db6231c9b115,
  ['GET'],
  [
    {
      id:6f953eac-107d-416f-bf22-c569ba4f62dd,
      user_title:'IDIR\PAUSTIN',
      developer_key:true,
      enabled:true,
      rate_limit:NULL
    }
  ],
  'IDIR\PAUSTIN',
  true,
  NULL,
  'revolsys.com',
  NULL,
  'http://revolsys.com',
  NULL
);

INSERT INTO gwa.end_point (id,allowed_http_methods,api_keys,created_by,enabled,rate_limit,title,upstream_password,upstream_url,upstream_username) VALUES
(
  960597ec-c4f1-4709-8caf-f4d8782d110f,
  ['GET'],
  [
    {
      id:b5cc4c71-5d61-4073-b127-1269427fe0ff,
      user_title:'IDIR\PXAUSTIN',
      developer_key:true,
      enabled:true,
      rate_limit:NULL
    }
  ],
  'IDIR\PXAUSTIN',
  true,
  NULL,
  'gurstin.com',
  NULL,
  'http://gurstin.com',
  NULL
);

INSERT INTO gwa.end_point (id,allowed_http_methods,api_keys,created_by,enabled,rate_limit,title,upstream_password,upstream_url,upstream_username) VALUES
(
  960597ec-c4f1-4709-8caf-f4d8782d110d,
  ['GET'],
  [
    {
      id:b5cc4c71-5d61-4073-b127-1269427fe0fd,
      user_title:'IDIR\PXAUSTIN',
      developer_key:true,
      enabled:true,
      rate_limit:NULL
    }
  ],
  'IDIR\PXAUSTIN',
  true,
  NULL,
  'google.com',
  NULL,
  'http://google.com',
  NULL
);