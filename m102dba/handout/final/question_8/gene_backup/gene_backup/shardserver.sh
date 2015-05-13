mkdir -p db/conf db/s1 db/s2

mongod --configsvr --dbpath db/conf --port 27019 &
mongod --shardsvr --dbpath db/s1 --port 27501 &
mongod --shardsvr --dbpath db/s2 --port 27601 &

mongorestore --oplogReplay --verbose --host localhost --port 27501 --drop s1
mongorestore --oplogReplay --verbose --host localhost --port 27601 --drop s2

mongos --configdb localhost:27019
