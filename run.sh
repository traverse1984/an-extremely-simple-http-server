#!/bin/bash
docker rm -f highlander-battery
docker run -d --name=highlander-battery -p 3030:3030 highlander/battery