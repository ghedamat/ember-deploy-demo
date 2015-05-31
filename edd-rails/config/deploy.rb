# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'edd-rails'
set :repo_url, 'git@github.com:ghedamat/ember-deploy-demo'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/sites/edd-rails'
set :git_strategy, RemoteCacheWithProjectRootStrategy
set :project_root, 'edd-rails'

set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{log}


# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('bin', 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  task :restart do
    on roles(:app), in: :sequence, wait: 10 do
      execute "/etc/init.d/unicorn upgrade"
    end
  end

  after :publishing, :restart
end
