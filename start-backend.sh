#!/bin/bash
cd backend

echo "Install backend packages starting..."

npm install

echo "Build backend starting..."

tsc

echo "Starting backend..."

npm start