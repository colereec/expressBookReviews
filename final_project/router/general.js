const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //TASK 1
  return res.status(200).send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //TASK 2
  const isbn = req.params.isbn;
  if (books[isbn]){
    return res.status(200).send(JSON.stringify(books[isbn]));
  }
  else{
    return res.status(404).json({message: "ISBN not found"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //TASK 3
  const author = req.params.author;
  const booksWithAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
  if (booksWithAuthor.length){
    return res.status(200).send(JSON.stringify(booksWithAuthor));
  }
  else{
    return res.status(404).json({message: "Author not found"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //TASK 4
  const title = req.params.title;
  const booksWithTitle = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
  if (booksWithTitle.length){
    return res.status(200).send(JSON.stringify(booksWithTitle));
  }
  else{
    return res.status(404).json({message: "Title not found"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //TASK 5
  const isbn = req.params.isbn;
  if (books[isbn]){
    if (Object.keys(books[isbn].reviews).length !== 0){
        return res.status(200).send(JSON.stringify(books[isbn].reviews));
    }
    else{
        return res.status(404).json({message: "No reviews found"});
    }
  }
  else{
    return res.status(404).json({message: "ISBN not found"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
