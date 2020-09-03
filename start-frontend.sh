#!/bin/bash
cd frontend

echo "Install frontend packages starting..."

npm install

echo "Build frontend starting..."

npm run build

echo "Starting frontend..."

npm start