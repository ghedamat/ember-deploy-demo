worker_processes 4

listen 3000
timeout 30

app_root = File.expand_path(File.join(File.dirname(__FILE__), '..'))
working_directory app_root

# explicitly set the binary name to the ruby env wrapper
# we have for unicorn
Unicorn::HttpServer::START_CTX[0] = "#{app_root}/bin/unicorn"

preload_app true

pid         app_root + '/log/unicorn.pid'
stderr_path app_root + '/log/unicorn.stderr.log'
stdout_path app_root + '/log/unicorn.stdout.log'

before_fork do |server, worker|
  # unicorn master doesn't need an open conneciton
  ActiveRecord::Base.connection.disconnect! if defined?(ActiveRecord::Base)

  # Throttle the master from forking too quickly by sleeping.  Due
  # to the implementation of standard Unix signal handlers, this
  # helps (but does not completely) prevent identical, repeated signals
  # from being lost when the receiving process is busy.
  # from: unicorn/examples/unicorn.conf.rb
  sleep 1
end

after_fork do |server, worker|
  # but unicorn workers sure do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord::Base)

  # seamless deploy recipe courtesy of
  # http://codelevy.com/2010/02/09/getting-started-with-unicorn
  # i.e. you can run
  # $ PID=log/unicorn.pid; test -s "$PID" && kill -USR2 `cat $PID`
  # from the app root to load the new code and have the workers
  # kill the old master process before forking
  #
  # note: see http://unicorn.bogomips.org/SIGNALS.html for an
  # even safer seamless restart setup (but requires enough RAM
  # to run two unicorn masters and two sets of workers)
  old_pid = app_root + '/log/unicorn.pid.oldbin'
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

before_exec do |server|
  # note: as of bundler v1.0.3 the executable template fully
  # resolves all symlinks when determining the Gemfile path.
  # this sets it back to the symlinked current path.
  ENV['BUNDLE_GEMFILE'] = "#{app_root}/Gemfile"
end
