#!/bin/sh
set -eu
docker build . --tag banry
docker tag banry docker.mutedchaos.com/banry:latest
docker push docker.mutedchaos.com/banry:latest
ssh core2 "kubectl rollout restart deployment banry"
