# Command to build docker image

DOCKER_BUILDKIT=1 docker build . -t demyst-todo-api --build-arg NODE_AUTH_TOKEN=<your-api-token> --secret id=npmrc,src=.npmrc.docker

# Command to run docker container

docker run -d -p 5000:5000 demyst-todo-api