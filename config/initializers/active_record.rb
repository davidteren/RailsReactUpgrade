# config/initializers/active_record.rb
# this has to be here because we need MyClass, which isn't loaded early enough to do in environments/production.rb

Rails.application.config.after_initialize do
end
