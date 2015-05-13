//
//
var mongo = require('mongodb'),  
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {  
  auto_reconnect: true
});

var db = new Db('final7', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};

exports.imageslist = function(gname, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('images', function(err, collection) {
        if (!err) {
          console.log('-collection- ', collection)
          collection.find({}).toArray(function(err, docs) {
            if (!err) {
              console.log('-docs- ',docs)
              db.close();
              var intCount = docs.length;
              if (intCount > 0) {
                var strJson = "";
                for (var i = 0; i < intCount;) {
                  strJson += '{"images":"' + docs[i] + '"}'
                  i = i + 1;
                  if (i < intCount) {
                    strJson += ',';
                  }
                  console.log('-1- ',strJson);
                }
                strJson = '{"GroupName":"' + gname + '","count":' + intCount + ',"images":[' + strJson + "]}"
                console.log('-2- ',strJson);
                callback("", JSON.parse(strJson));
              }
            } else {
              onErr(err, callback);
            }
          }); //end collection.find 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};