local BasePlugin = require "kong.plugins.base_plugin"
local utils = require "kong.tools.utils"
local cache = require "kong.tools.database_cache"
local singletons = require "kong.singletons"
local constants = require "kong.constants"
local responses = require "kong.tools.responses"

local AllowedRequestMethodHandler = BasePlugin:extend()

function AllowedRequestMethodHandler:new()
  AllowedRequestMethodHandler.super.new(self, "allowed-request-method")
end

function AllowedRequestMethodHandler:access(conf)
  AllowedRequestMethodHandler.super.access(self)
  local method_name = ngx.req.get_method()
  
  -- 
  if not (ngx.req.get_headers()["authorization"] or ngx.req.get_headers()["proxy-authorization"]) then
    ngx.header["WWW-Authenticate"] = realm
    return responses.send_HTTP_METHOD_NOT_ALLOWED()
  end

end

AllowedRequestMethodHandler.PRIORITY = 1000

return AllowedRequestMethodHandler
