require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TestApp
  class Application < Rails::Application
    # Before filter for Flipflop dashboard. Replace with a lambda or method name
    # defined in ApplicationController to implement access

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.active_support.cache_format_version = 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    config.eager_load_paths << "#{config.root}/test/mailers/previews"
    config.active_job.queue_adapter = :sidekiq

    # This is to deal with the issues outlined in the following:
    # https://stackoverflow.com/questions/72970170/upgrading-to-rails-6-1-6-1-causes-psychdisallowedclass-tried-to-load-unspecif
    #
    # Load all nested locale files under config/locales
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}")]

    config.generators do |generate|
      generate.helper false
      generate.assets false
      generate.jbuilder false
    end
  end
end
