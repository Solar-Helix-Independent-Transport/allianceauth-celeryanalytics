#!/bin/bash

echo "Cleaning old assets."
rm -rf ../celeryanalytics/static/celeryanalytics/static
rm ../celeryanalytics/static/celeryanalytics/manifest.json
echo "Copying new assets."
cp build/static/.vite/manifest.json ../celeryanalytics/static/celeryanalytics/manifest.json
cp -r build/static/assets ../celeryanalytics/static/celeryanalytics
echo "Assets copied successfully."
