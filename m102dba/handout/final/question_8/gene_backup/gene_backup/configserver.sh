mkdir -p db/conf
mongod --configsvr --dbpath db/conf --port 27019
mongorestore --verbose --host localhost --port 27019 --db admin --drop config_server/admin
mongorestore --verbose --host localhost --port 27019 --db config --drop config_server/config

mongo localhost:27019/config < EOF
db.chunks.find().sort({_id:1}).next().lastmodEpoch.getTimestamp().toUTCString().substr(20,6)
EOF
