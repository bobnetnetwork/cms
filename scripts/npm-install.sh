#!/bin/bash
echo "Install backend packages starting..."
cd backend
npm install
cd ..
echo "Install dashboard packages starting..."
cd dashboard
npm install
cd ..
echo "Install frontend packages starting..."
cd frontend
npm install
cd ..