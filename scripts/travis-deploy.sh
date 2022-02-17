#!/bin/bash
echo Deploy application on branch $TRAVIS_BRANCH to server:
sshpass -p $ApiaryDiaryPassword ssh -o 'StrictHostKeyChecking=no' root@$ApiaryDiaryAddress "docker-compose down && docker-compose pull && docker-compose up -d && echo yes && docker system prune && echo yes"
