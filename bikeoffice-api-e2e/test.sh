#!/bin/bash

# Build container
docker build -t e2e-pg-bikeoffice ./bikeoffice-api-e2e/

# Run Container
docker run --name test-db -p 5432:5432 -d e2e-pg-bikeoffice

# Run Jest tests
nx e2e bikeoffice-api-e2e

# remove container
docker kill test-db && docker rm test-db