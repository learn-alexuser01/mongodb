
var MongoClient = require('mongodb').MongoClient;

var databaseName = 'course', 
    collectionName = 'students';

MongoClient.connect("mongodb://localhost:27017/"+databaseName, function(err, db) { 
    if (err) throw err;
var students = db.collection(collectionName); 
students.insert({name: "Addison", superpower: "insert"}, function(err, result) { 
    if (err) throw err; 
    var _id = result[0]._id ; 
     console.dir(_id + " " + result); 
        db.close(); 
    }); 
}); 
