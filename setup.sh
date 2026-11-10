#!/bin/bash

if [ ! -d "/Applications/Google Chrome.app" ]; then
  echo "Google Chrome is not installed under /Applications. Please install it before continuing."
  exit 1
fi

export PUPPETEER_SKIP_DOWNLOAD=true
npm install
