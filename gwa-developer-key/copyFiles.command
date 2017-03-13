cd `dirname $0`
for dir in Authentication bcgov-template Component Service; do
  cp -r ../gwa-admin/src/main/angular/src/app/$dir/ src/main/angular/src/app/$dir/
done
read