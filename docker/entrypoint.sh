#!/bin/sh
set -e

if [ ! -d node_modules/react ]; then
  echo "Installing npm dependencies..."
  npm ci
fi

echo "Starting frontend on http://0.0.0.0:5173"
exec npm run dev -- --host 0.0.0.0 --port 5173
