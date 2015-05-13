var iCursor = db.images.find({}, {_id: 1});
var iArray = iCursor.toArray();


for (var i=0; i< iArray.length; i++) {
  var id = iArray[i]._id;
  var aCursor = db.albums.findOne({'images': {$in: [id]}});

  if (aCursor)
    db.images.update({_id: id}, {$set: {claimed: true}});
  };
}
