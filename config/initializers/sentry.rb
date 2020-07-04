Raven.configure do |config|
  config.dsn = ENV['SENTRY_DSN_BACK']
  config.environments = %w(production)
  config.excluded_exceptions = []
end