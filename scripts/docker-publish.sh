#!/bin/bash
DOCKER_ENV=''
DOCKER_TAG=''
case "$TRAVIS_BRANCH" in
  "master")
    DOCKER_ENV=production
    DOCKER_TAG=latest
    ;;
  "develop")
    DOCKER_ENV=development
    DOCKER_TAG=dev
    ;;    
esac

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t apiarydiary-ui:$DOCKER_TAG -f dockerfile .
docker tag apiarydiary-ui:$DOCKER_TAG $DOCKER_USERNAME/apiarydiary-ui:$DOCKER_TAG
docker push $DOCKER_USERNAME/apiarydiary-ui:$DOCKER_TAG