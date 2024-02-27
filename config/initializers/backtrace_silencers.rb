# Be sure to restart your server when you modify this file.

# You can add backtrace silencers for libraries that you're using but don't wish to see in your backtraces.
# Rails.backtrace_cleaner.add_silencer { |line| /my_noisy_library/.match?(line) }

# You can also remove all the silencers if you're trying to debug a problem that might stem from framework code
# by setting BACKTRACE=1 before calling your invocation, like "BACKTRACE=1 ./bin/rails runner 'MyClass.perform'".

# XXX Rails backtrace cleaning API should be more declarative

silencers = Rails.backtrace_cleaner.instance_variable_get(:@silencers).dup

# Remove the default rails backtrace silencer
silencers = silencers.reject { |p| p.source_location.first =~ /rails\/backtrace_cleaner.rb/ }
Rails.backtrace_cleaner.remove_silencers!

silencers.each do |s|
  Rails.backtrace_cleaner.add_silencer(&s)
end

Rails.backtrace_cleaner.add_silencer do |line|
  !(
  Rails::BacktraceCleaner::APP_DIRS_PATTERN.match?(line) ||
  /\Adomain\//.match?(line)
)
end

Rails.backtrace_cleaner.remove_silencers! if ENV["BACKTRACE"]
