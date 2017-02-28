local BasePlugin = require "kong.plugins.base_plugin"
local utils = require "kong.tools.utils"
local cache = require "kong.tools.database_cache"
local singletons = require "kong.singletons"
local constants = require "kong.constants"
local responses = require "kong.tools.responses"

local ApiEnabledHandler = BasePlugin:extend()

function ApiEnabledHandler:new()
  ApiEnabledHandler.super.new(self, "api-enabled")
end

function ApiEnabledHandler:access(conf)
  ApiEnabledHandler.super.access(self)
  if conf.enabled == false then
    return responses.send_HTTP_SERVICE_UNAVAILABLE()
  end

end

ApiEnabledHandler.PRIORITY = 1

return ApiEnabledHandler
