#!/bin/bash

docker_user=yzc1114
image_name=jupyterlab-management-frontend
image_tag=v3


image=${docker_user}/${image_name}:${image_tag}
echo "Target docker image: ${image}"

# Build the project
echo "Step 1: Building the project..."
npm run build

# Build the docker image
echo "Step 2: Building the docker image: ${docker_user}/${image_name}:${image_tag}"
docker build -t ${docker_user}/${image_name}:${image_tag} .

# Push the docker image
echo "Step 3: Pushing the docker image..."
docker push ${docker_user}/${image_name}:${image_tag}