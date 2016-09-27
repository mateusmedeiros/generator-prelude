# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Cache,
  metastore: 'file:tmp/cache/rack/meta',
  entitystore: 'file:tmp/cache/rack/body',
  verbose: true,
  allow_reload: true,
  allow_revalidate: true

run Rails.application
