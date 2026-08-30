#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DIST_DIR="$PROJECT_DIR/dist"
XPI_PATH="$DIST_DIR/zotero-eye-care-1.1.0.xpi"

mkdir -p "$DIST_DIR"
rm -f "$XPI_PATH"

cd "$PROJECT_DIR"
zip -X -q -r "$XPI_PATH" \
  manifest.json \
  bootstrap.js \
  content

printf '%s\n' "$XPI_PATH"

