var dbSet = require('../setting');
var MongoClient = require('mongodb').MongoClient;

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.usercode = user.usercode;
    this.datetime = user.datetime;
    this.islive = user.islive;
};

const insertUser = function(user, db, callback) {
    const collection = db.collection('users');
    collection.insertMany([user], function(err, result) {
        if (err) return callback(err);
        console.log("Inserted " + result.insertedCount + " user into the collection");
        callback();
    });
}

const updateUser = function(user, db, callback) {
    const collection = db.collection('users');
    console.log();
    collection.updateOne({ name: user.name }, { $set: { password: user.password, usercode: user.usercode, datetime: user.datetime, islive: user.islive, } }, function(err, result) {
        callback();
    });
}

User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password,
        usercode: this.usercode,
        datetime: this.datetime,
        islive: this.islive
    };
    MongoClient.connect(dbSet.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        const db = client.db(dbSet.db);
        findUser(user.name, db, function(err, result) {
            console.log(err, result, '-------------------------result');
            if (result.length > 0) {
                updateUser(user, db, function(result1) {
                    callback(result1);
                    client.close();
                });
            } else {
                insertUser(user, db, function(result2) {
                    callback(result2);
                    client.close();
                });
            }
        });
    });
}

const findUser = function(username, db, callback) {
    const collection = db.collection('users');
    collection.find({ name: username }).toArray(function(err, docs) {
        if (err) throw err;
        console.log("Found the following records");
        callback(err, docs);
    });
}

User.get = function(username, callback) {
    MongoClient.connect(dbSet.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        const db = client.db(dbSet.db);
        findUser(username, db, function(err, result) {
            if (result.length > 0) {
                callback(err, result[0]);
            } else {
                callback(err);
            }
            client.close();
        });
    });
};

module.exports = User;