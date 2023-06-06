#!/bin/bash

# Set up container
echo 'SETTING UP CONTAINER...'

# execute inserts in the container
echo 'INSERTING TEST DATA...'

# Run Jest tests
nx e2e bikeoffice-api-e2e

# remove container
echo 'REMOVING CONTAINER...'