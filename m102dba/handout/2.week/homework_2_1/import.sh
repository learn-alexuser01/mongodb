mongoimport --db pcat -c products < products.json
echo "db.products.count()" | mongo localhost/pcat
