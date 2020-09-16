#!/bin/bash
cd dashboard

echo "Install dashboard packages starting..."

npm install

echo "Build dashboard starting..."

npm run build

echo "Starting dashboard..."

npm start