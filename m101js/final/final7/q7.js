// When you are done removing the orphan images from the collection,
// there should be 89,737 documents in the images collection.
// To prove you did it correctly, what are the total number of images
// with the tag 'kittens" after the removal of orphans? As as a
// sanity check, there are 49,932 images that are tagged 'kittens'
// before you remove the images.
//
// Hint: you might consider creating an index or two or your program will take a long time to run.
//
// db.images.find({tags: 'kittens'}).count();

// look through albums insert images found with claimed = true
// remove all images w/o claimed

var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/final7', function(err, db) {

	if(err) throw err;

	var albums = db.collection('albums');
	var images = db.collection('images');

	var acursor = albums.find({}, {images: 1, _id: 0});
	var icursor = images.find({}, {_id: 1});

/*
// starts with albums
 
	imageArray = [];
	acursor.each(function (err, doc) {
      if (err) {
        console.log(err);
      } else {
      	if (doc) {
      		var docImages = doc.images;
			imageArray = _.union(_.flatten(_.uniq(imageArray)), docImages);
      	}
      }
//      console.log('Fetched:', imageArray);
    });
    console.log(imageArray.length);
*/


// starts with images
   	iarray = [];
    function findImage = icursor.each(function (err, image) {
		if (err) {
//			console.log(err);
		} else {
			if (image) {
				var imageId = image._id;
				acursor.find({images: imageId}, function(err, album){
					if (err) throw err;
					console.log(album);
				});
			}
		}
	});
});






