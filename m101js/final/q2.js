// Which pair of people have the greatest number of messages in the dataset?
//
// susan.mara@enron.com to jeff.dasovich@enron.com
// { "_id" : { "From" : "susan.mara@enron.com", "To" : "jeff.dasovich@enron.com" }, "count" : 750 }

// susan.mara@enron.com to richard.shapiro@enron.com
// { "_id" : { "From" : "susan.mara@enron.com", "To" : "richard.shapiro@enron.com" }, "count" : 974 }

// soblander@carrfut.com to soblander@carrfut.com
// { "_id" : { "From" : "soblander@carrfut.com", "To" : "soblander@carrfut.com" }, "count" : 679 }

// susan.mara@enron.com to james.steffes@enron.com
// { "_id" : { "From" : "susan.mara@enron.com", "To" : "james.steffes@enron.com" }, "count" : 648 }

// evelyn.metoyer@enron.com to kate.symes@enron.com
// { "_id" : { "From" : "evelyn.metoyer@enron.com", "To" : "kate.symes@enron.com" }, "count" : 567 }

// susan.mara@enron.com to alan.comnes@enron.com
// { "_id" : { "From" : "susan.mara@enron.com", "To" : "alan.comnes@enron.com" }, "count" : 550 }

// $unwind headers.To:
// $match john
// header.From: andrew count
 //

db.messages.aggregate([
    {$match: 
    	{"headers.From": "evelyn.metoyer@enron.com"}
    },
    {$unwind: "$headers.To"},
    {$match: {"headers.To": "kate.symes@enron.com"}},
    {$group:
    	{
    		_id: {From: "$headers.From", To: "$headers.To"},
    		count: { $sum: 1 },
    	}
    }
    ])