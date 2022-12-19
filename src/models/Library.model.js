'user strict';
var dbConn = require('../../config/db.config');

class Book {
    constructor(book) {
        this.book_name = book.book_name;
        this.author_name = book.author_name;
        this.pages = book.pages;
    }
    static create(newBook) {
        return new Promise((resolve, reject) => {
            dbConn.query("INSERT INTO book set ?", newBook, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return reject(err);
                }
                else {
                    console.log(res.insertId);
                    return resolve(res);
                }
            });
        });
    }
    static search(bookDetail) {
        return new Promise((resolve, reject) => {
            dbConn.query("Select * from book where book_name = ? and author_name = ?", [bookDetail.book_name, bookDetail.author_name], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return reject(err);
                }
                else {
                    return resolve(res);
                }
            });
        });
    }
    static findAll() {
        return new Promise((resolve, reject) => {
            dbConn.query("Select * from book", function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return reject(err);
                }
                else {
                    console.log('books : ', res);
                    var data = JSON.parse(JSON.stringify(res));
                    if (data[0])
                        return resolve(res);

                    else
                        return resolve("No Data Available in DataBase.");
                }
            });
        });
    }
    static delete(bookDetail) {
        return new Promise((resolve, reject) => {
            console.log("Delete: ", bookDetail);
            dbConn.query("DELETE FROM book WHERE book_name = ?", [bookDetail.book_name], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return reject(err);
                }
                else {
                    console.log("Delete: ", res);
                    if (res.affectedRows != 0)
                        return resolve(res);

                    else
                        return reject("No Row Deleted.");
                }
            });
        });
    }
}

module.exports= Book;
