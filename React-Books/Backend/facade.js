var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/book-demo'
var autoIncrement = require("mongodb-autoincrement");



function getBooks(callback) {
    MongoClient.connect(url, (err, db) => {

        db.collection("books").find({}).toArray((err, data) => {
            if (err) { throw err; }
            var books = data
            console.log("Getting books");
            callback(books)
            db.close()
        })
    })
}

function addBook(book, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }
        autoIncrement.getNextSequence(db, "books", (err, autoIndex) => {
            if (err) { throw err; }
            var collection = db.collection("books")
            book.id = autoIndex
            collection.insertOne({ id: book.id, title: book.title, info: book.info, moreInfo: book.moreInfo }, (err, data) => {
                if (err) { throw err; }
                var result = data.ops[0]
                console.log("Book added");
                callback(result)
            })
        })

    })

}

function deleteBook(bookId, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }

        db.collection("books").deleteOne({ id: bookId }, (err, data) => {
            if (err) { throw err; }
            var response = data
            console.log("Deleted books");
            callback(response)
        })
    })
}

function updateBook(book, callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) { throw err; }
        var options = {
            returnOriginal: false,
            upsert: true
        }

        db.collection("books").findOneAndReplace({ id: book.id },
            { $set: { "id": book.id, "title": book.title, "info": book.info, "moreInfo": book.moreInfo } },
            options, (err, data) => {
                if (err) { throw err; }
                var updatedBook = data.value
                console.log("Books updated");
                callback(updatedBook)
            })
    })
}

var facade = {
    getBooks: getBooks,
    addBook: addBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
}

module.exports = facade