//
// Construct a query to calculate the number of messages sent by Andrew Fastow,
// CFO, to Jeff Skilling, the president. Andrew Fastow's email addess was
// andrew.fastow@enron.com. Jeff Skilling's email was jeff.skilling@enron.com.
//
// For reference, the number of email messages from
// Andrew Fastow to John Lavorato (john.lavorato@enron.com) was 1.

// headers.From:
// headers.To[]:


// $unwind headers.To:
// $match john
// header.From: andrew count
 //

db.messages.aggregate([
    {$match: 
    	{"headers.From": "andrew.fastow@enron.com"}
    },
    {$unwind: "$headers.To"},
    {$match: {"headers.To": "jeff.skilling@enron.com"}},
    {$group:
    	{
    		_id: {From: "$headers.From", To: "$headers.To"},
    		count: { $sum: 1 },
    	}
    }
    ])
