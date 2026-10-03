#!/usr/bin/env bash
# Downloads the two OFL fonts the engine uses into ./fonts (not committed: ~25 MB).
set -euo pipefail
cd "$(dirname "$0")"; mkdir -p fonts
curl -fsSL -o fonts/JasonHandwriting1.ttf https://raw.githubusercontent.com/jasonhandwriting/JasonHandwriting/master/JasonHandwriting1.ttf
tmp=$(mktemp -d); curl -fsSL -o "$tmp/ow.tgz" https://registry.npmjs.org/openwrite-fonts/-/openwrite-fonts-1.0.0.tgz
tar xzf "$tmp/ow.tgz" -C "$tmp" package/Yozai-Regular.ttf && mv "$tmp/package/Yozai-Regular.ttf" fonts/ && rm -rf "$tmp"
ls -la fonts
