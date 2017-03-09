cd `dirname $0`
for dir in Authentication bcgov-template bs-form Component service; do
  cp -r ../gwa-admin/src/main/angular/src/app/$dir/ src/main/angular/src/app/$dir/
done
read