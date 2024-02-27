# A sample Guardfile
# More info at https://github.com/guard/guard#readme

## Uncomment and set this to only include directories you want to watch
# directories %w(app lib config test spec features) \
#  .select{|d| Dir.exist?(d) ? d : UI.warning("Directory #{d} does not exist")}

## Note: if you are using the `directories` clause above and you are not
## watching the project directory ('.'), then you will want to move
## the Guardfile to a watched dir and symlink it back, e.g.
#
#  $ mkdir config
#  $ mv Guardfile config/
#  $ ln -s config/Guardfile .
#
# and, you'll have to watch "config/Guardfile" instead of "Guardfile"

# NOTE to disable spring:
#   spring: "bin/rails test", all_after_pass: false, all_on_start: false

def ignore_directories(*ignored)
  dirs = Dir["*/"].map { |d| d.chomp("/") }
  directories dirs - ignored.map(&:to_s)
end

ignore_directories("vendor", "node_modules", "docker", "log", "db", "storage", "public", "bin", "tmp")

group :app do
  guard :minitest, all_on_start: false do
    # with Minitest::Unit
    watch(%r{^test/(.*)\/?test_(.*)\.rb$})
    watch(%r{^test/.+_test\.rb$})

    watch(%r{^lib/(.*/)?([^/]+)\.rb$})     { |m| "test/#{m[1]}test_#{m[2]}.rb" }

    watch(%r{^lib/(.*/)?([^/]+)\.rb$})     { |m| "test/unit/lib/#{m[1]}#{m[2]}_test.rb" }
    watch(%r{^lib/(.*/)?([^/]+)\.rb$})     { |m| Dir["test/unit/lib/#{m[1]}#{m[2]}/*_test.rb"] }

    watch(%r{^test/test_helper\.rb$})      { "test" }

    watch(%r{^app/(.+)\.rb$}) { |m| "test/#{m[1]}_test.rb" }
    watch(%r{^app/(.+)\.rb$}) { |m| Dir["test/#{m[1]}/*_test.rb"] }

    watch(%r{^app/lib/(.+)\.rb$}) { |m| "test/unit/lib/#{m[1]}_test.rb" }
    watch(%r{^app/lib/(.+)\.rb$}) { |m| Dir["test/unit/lib/#{m[1]}/*_test.rb"] }
  end
end

def domain_group(name)
  domain_root = "domain/#{name}"
  domain_tests = "#{domain_root}/test"

  group(name) do
    guard(:minitest, test_folders: [domain_tests], all_on_start: false) do
      # with Minitest::Unit
      watch(%r{^#{domain_root}/test/(.*)\/?test_(.*)\.rb$})
      watch(%r{^#{domain_root}/test/.+_test\.rb$})

      watch(%r{^#{domain_root}/lib/(.*/)?([^/]+)\.rb$})     { |m| "#{domain_root}/test/lib/#{m[1]}test_#{m[2]}.rb" }
      watch(%r{^#{domain_root}/lib/(.*/)?([^/]+)\.rb$})     { |m| "#{domain_root}/test/lib/#{m[1]}#{m[2]}_test.rb" }
      watch(%r{^#{domain_root}/lib/(.*/)?([^/]+)\.rb$})     { |m| Dir["#{domain_root}/test/lib/#{m[1]}#{m[2]}/*_test.rb"] }
      watch(%r{^#{domain_root}/lib/(.*/)?([^/]+)\.rb$})     { |m| Dir["#{domain_root}/test/lib/#{m[1]}#{m[2]}/**/*_test.rb"] }

      watch(%r{^#{domain_root}/test/test_helper\.rb$})      { "test" }
    end
  end
end

domain_groups = nil

Dir.chdir(__dir__) do
  domain_groups = Dir["domain/*/"].map { |d| File.basename(d).to_sym }
end

domain_groups.each do |dg|
  domain_group dg
end
