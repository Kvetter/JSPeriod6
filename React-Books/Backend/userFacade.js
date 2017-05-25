var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/book-demo'
var autoIncrement = require("mongodb-autoincrement");
var bcrypt = require("bcrypt")

function createNewUser(username, password, callback) {
    // hashing and salting the password
    let hash = bcrypt.hashSync(password, 10) // 10 is rounds use when creating an salt!
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }

        db.collection("users").insertOne({ username: username, password: hash }, (err, data) => {
            if (err) { throw err; }
            var result = data.ops[0]
            callback(result)
        })
    })
}

function findUserByName(username, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }
        db.collection("users").findOne({ username: username }, (err, data) => {
            if (err) { throw err; }
            user = data
            callback(user)
        })
    })
}

function login(username, password, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }
        db.collection("users").findOne({ username: username }, (err, data) => {
            if (err) { throw err; }
            if (data == null) {
                callback({ user: null, succes: false })
                return
            }
            user = data
            if (bcrypt.compareSync(password, user.password)) {
                callback({ user: user, succes: true })
            }
            else {
                console.log("Authentication Failed")
                callback({ user: null, succes: false })
            }
        })
    })
}



var userFacade = {
    createNewUser: createNewUser,
    login: login,
    findUserByName: findUserByName
}

module.exports = userFacade


