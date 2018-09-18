var dbSet = require('../setting');
var MongoClient = require('mongodb').MongoClient;

function Post(username, post, time) {
    this.user = username;
    this.post = post;
    this.time = time || new Date().getTime();
}

function inserPost(post, db, callback) {
    var collection = db.collection('posts');
    collection.insertOne(post, { safe: true }, function(err, post) {
        if (err) return callback(err);
        callback();
    })
}

Post.prototype.save = function(callback) {
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    }
    MongoClient.connect(dbSet.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        const db = client.db(dbSet.db);
        inserPost(post, db, function(result) {
            callback(result);
            client.close();
        });
    })
}

Post.get = function(username, callback) {
    MongoClient.connect(dbSet.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        const db = client.db(dbSet.db);
        db.collection('posts', function(err, collection) {
            if (err) {
                client.close();
                return callback(err);
            }
            var query = {};
            if (username) {
                query.user = username;
            }
            collection.find(query).sort({ time: -1 }).toArray(function(err, docs) {
                client.close();
                if (err) {
                    callback(err, null);
                }
                var posts = [];
                docs.forEach(function(doc, index) {
                    var post = new Post(doc.user, doc.post, dataFormat(doc.time, 'yyyy-mm-dd hh:ii:ss'));
                    posts.push(post);
                })
                callback(null, posts);
            })
        });
    })
}

function dataFormat(d, format) {
    var d = new Date(parseInt(d));
    var date = { "m+": d.getMonth() + 1, "d+": d.getDate(), "h+": d.getHours(), "H+": d.getHours(), "i+": d.getMinutes(), "s+": d.getSeconds(), "q+": Math.floor((d.getMonth() + 3) / 3), "S+": d.getMilliseconds() };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

module.exports = Post;