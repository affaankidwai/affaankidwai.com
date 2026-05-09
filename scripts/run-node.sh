#!/usr/bin/env bash
# Use the bundled Node 24 binary on macOS-ARM (where it's installed via
# optionalDependencies). Fall back to whatever `node` is on PATH on Vercel /
# Linux / any other platform.
set -e
BUNDLED="./node_modules/node-bin-darwin-arm64/bin/node"
if [ -x "$BUNDLED" ]; then
  exec "$BUNDLED" "$@"
fi
exec node "$@"
