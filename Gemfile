source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

gem "rails", "~> 7.0.7.2"

gem "sqlite3", "~> 1.4"

gem "puma", "~> 5.6.5"

gem "sass-rails", ">= 6"

gem 'vite_rails'

gem "jbuilder", "~> 2.7"

gem "nokogiri", "~> 1.13"

gem "slim-rails", "~> 3.2"
gem "react-rails", "~> 2.6"
gem "js-routes", "~> 2.2.7"

gem "flamegraph"
gem "stackprof"
gem "rack-mini-profiler", "~> 2.3"

gem "sidekiq", "~> 6.5.8"

gem "mini_magick"

gem "gon"
gem "faker", "~> 2.23.0"

gem "bootsnap"

group :production, :staging do
  gem "airbrake", "~> 13.0.3"
end

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "factory_bot_rails"
  gem "debug"
end

group :development do
  gem "brakeman", require: false
  gem "solargraph", require: false
  gem "overcommit", require: false
  gem "ruby-lsp", require: false

  gem "web-console", ">= 4.2.1"

  gem "listen", "~> 3.3"
  gem "spring"

  gem "bullet"

  gem "bcrypt_pbkdf", "< 2"
  gem "ed25519", "< 2"

  gem "rubocop", "~> 1.32.0"
  gem "rubocop-daemon"
  gem "rubocop-rails"
  gem "rubocop-airbnb", "~> 6.0.0"

  gem "pry-byebug", "~> 3.9"
  gem "pry-inline"
  gem "pry-rescue"

  gem "guard"
  gem "guard-minitest"
end

group :test do
  gem "minitest", "5.18.1"
  gem "capybara", ">= 3.39.2"
  gem "selenium-webdriver"
  gem "webdrivers"
end

group :staging, :development, :profile do
  gem "ruby-prof"
end

gem "foreman", "~> 0.87.2"
