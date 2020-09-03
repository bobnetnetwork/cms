#!/bin/bash
echo "Build backend docker image starting..."

docker build ./backend/ -t cms-backend