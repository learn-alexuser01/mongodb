// start mongo in a replication set:
mongod --dbpath 1 --port 27001 --smallfiles --oplogSize 50 --replSet local 2>&1 > log/1.log &

// initialize the replication set from the primary
// add other mongoDB to the set
rs.initiate()
rs.add("Authorizeds-MacBook-Air-3.local:2700")

// let the slave know you're OK with (potentially) stale data on slaves after joining
rs.slaveOk()

// remove master
rs.stepDown()

// 
db.oplog.rs.find()

