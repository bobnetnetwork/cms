#!/bin/bash
echo "Build frontend docker image starting..."

docker build ./frontend/ -t cms-frontend