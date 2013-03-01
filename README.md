#IpBoard

A client library for making XML RPC requests to ipboard with Node.js.

##Usage
```javascript
var ipboard = require('./lib/ipboard');

var client = new ipboard({
  encoding: 'utf8',
  api_key: 'yoursecretkey',
  host: 'yourawesomeforum.com',
  port: 80,
  path:'/community/interface/board/index.php' //Only need to set if different from standard /interface/board/index.php
});

client.fetchTopics({
  forum_ids: '16',
  order_field: 'post_date',
  order_by: 'desc',
  offset: '0',
  limit: '10',
  view_as_guest: false
}, function(err, results){
  //Good job!
});
```

##Methods Available

### postTopic(options, cb)
Params:
```javascript
{
  member_field: String,
  member_key  : String,
  forum_id    : String,
  topic_title : String,
  post_content: String
}
```

### postReply(options, cb)
Params:
```javascript
{
  member_field: String,
  member_key  : String,
  topic_id    : String,
  post_content: String
}
```

### fetchMember(options, cb)
Params:
```javascript
search_type   : String,
search_string : String
```

### checkMemberExists(options, cb)
Params:
```javascript
search_type   : String,
search_string : String
```

### fetchOnlineUsers(cb)
Params: None

### fetchForumsOptionList(options, cb)
Params: None

### fetchForums(options, cb)
Params:
```javascript
{
  forum_ids: String // comma separated list
}
```

### fetchTopics(options, cb)
Params:
```javascript
{
  forum_ids: String, // comma separated list
  order_field: String,
  order_by: String, // asc|desc
  offset: Number,
  limit: Number,
}
view_as_guest: Number // 0 for false, 1 for true
```

### fetchStats(options, cb)
Params: None

### helloBoard(cb)
Params: None

### customFunction(functionName, options, cb)
Params:
```javascript
functionName // the string of the function name you created
{
  //Whatever options you should be passing
}
```

##License
MIT

---
#####Made with love by @taterbase
