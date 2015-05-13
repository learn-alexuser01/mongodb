
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/final7', function(err, db) {

    if(err) throw err;

    var albums = db.collection('albums');
    var images = db.collection('images');

    this.findImageInAlbum = function(imageId, callback) {
        "use strict";
        albums.findOne({'images': imageId}, function(err, post) {
            "use strict";
            if (err) return callback(err, null);

//            console.log(post);
            callback(err, post);
        });
    }

    images.find().toArray(function (err, image) {
        if (err) {
          console.log(err);
        } else {
            if (image) {
                
                findImageInAlbum(imageId, function(err, album){
                    if (err) throw err;
//                    console.log(album);
                });
            }
        }
    });
});

