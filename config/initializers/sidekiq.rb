Sidekiq.configure_server do |config|
  cfg = Rails.application.config_for(:redis)
  config.redis = { url: cfg.sidekiq_url }
end

Sidekiq.configure_client do |config|
  cfg = Rails.application.config_for(:redis)
  config.redis = { url: cfg.sidekiq_url }
end
