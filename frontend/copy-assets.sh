#!/bin/bash

echo "Cleaning old assets."
rm -rf ../celeryanalytics/static/celeryanalytics/static
rm ../celeryanalytics/static/celeryanalytics/asset-manifest.json
echo "Copying new assets."
cp build/asset-manifest.json ../celeryanalytics/static/celeryanalytics/asset-manifest.json
cp -r build/static/ ../celeryanalytics/static/celeryanalytics/static
echo "Assets copied successfully."
