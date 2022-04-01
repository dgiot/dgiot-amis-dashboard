#!/bin/sh
mkdir -p diist2/dgiot-amis-dashboard
cp -r dist  diist2/dgiot-amis-dashboard
rm -rf dist && mv diist2 dist
