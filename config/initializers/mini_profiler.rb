# TODO(auth): Build in authorization for mini-profiler in UserSessions when we need to use it in production or staging
Rack::MiniProfiler.config.position        = "right"
Rack::MiniProfiler.config.start_hidden    = false
Rack::MiniProfiler.config.toggle_shortcut = "alt+z"

Rack::MiniProfiler.config.authorization_mode = :whitelist if Rails.env.production? || Rails.env.staging?

Rails.application.config.after_initialize do
  Rack::MiniProfiler.config.backtrace_includes << /^\/?(domain)/
end
