#!/bin/bash
echo "Build dashboard docker image starting..."

docker build ./dashboard/ -t cms-dashboard