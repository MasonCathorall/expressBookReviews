const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});

  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({username, password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // const isbn = req.query.isbn;
  console.log(req.params.isbn);
  let book = books[req.params.isbn];
  return res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const reqAuthor = req.params.author;
  let authorBooks = [];
  for( let i = 1; i < 11; i++){
    if(books[i].author === reqAuthor) authorBooks.push(books[i]);
  }

  return res.send(JSON.stringify(authorBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;
  let titleBooks = [];
  for( let i = 1; i < 11; i++){
    if(books[i].title === title) titleBooks.push(books[i]);
  }
  return res.send(JSON.stringify(titleBooks));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn].reviews));
});


/*
 * ASYNC or PROMISES
 * 
 * 
 */

public_users.get("/promise/", function(req, res) {
  let promise = new Promise(function(resolve, reject) {
    resolve(res.send(JSON.stringify(books)));
  })
  promise.then( () => console.log("Book list sent"));
});


public_users.get("/promise/isbn/:isbn", function(req, res) {
  const isbn = req.params.isbn;
  let promise = new Promise(function(resolve, reject) {
    resolve(res.send(JSON.stringify(books[isbn])));
  })
  promise.then( () => console.log("Book was sent"));
});

public_users.get("/promise/author/:author", function(req, res) {
  let author = req.params.author;
  let authorBooks = [];
  let promise = new Promise(function(resolve, reject) {
    for( let i = 1; i < 11; i++){
      if(books[i].author === author) authorBooks.push(books[i]);
    }

    resolve(res.send(JSON.stringify(authorBooks)));
  })
  promise.then( () => console.log("Book list sent"));
});

public_users.get("/promise/title/:title", function(req, res) {
  let title = req.params.title;
  let titleBooks = [];
  let promise = new Promise(function(resolve, reject) {
    for( let i = 1; i < 11; i++){
      if(books[i].title === title) titleBooks.push(books[i]);
    }
    resolve(res.send(JSON.stringify(titleBooks)));
  })
  promise.then( () => console.log("Book list sent"));
});


module.exports.general = public_users;
