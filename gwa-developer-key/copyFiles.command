#!/bin/bash
cd `dirname $0`
for dir in Authentication bcgov-template Component Service; do
  cp -r ../gwa-admin/src/app/$dir/ src/app/$dir
done
read -p "Press any key to continue... " -n1 -s

