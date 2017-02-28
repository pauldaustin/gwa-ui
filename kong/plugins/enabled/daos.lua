local SCHEMA = {
  primary_key = {"id"},
  table = "api_enabled", 
  fields = {
    id = {type = "id", dao_insert_value = true},
    created_at = {type = "timestamp", immutable = true, dao_insert_value = true},
    api_id = {type = "id", required = true, foreign = "apis:id"},
    enabled = {type = "boolean", required = true}
  }
}

return {api_enabled = SCHEMA}