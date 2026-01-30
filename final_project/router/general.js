const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //TASK 6
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
      // Check if the username is valid for registration
      if (isValid(username)) {
          // If valid, add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User registration successful"});
      } else {
          return res.status(404).json({message: "User already exists"});
      }
  }
  // Error if username or password is missing
  return res.status(404).json({message: "Unable to register user"});
  //return res.status(300).json({message: "Yet to be implemented"});
});

/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //TASK 1
  return res.status(200).send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});
*/

//TASK 10
public_users.get('/', function (req, res) {
	const getBooks = new Promise((resolve, reject) => {
		resolve(books);
	});

	getBooks
        .then((bookList) => { return res.status(200).send(JSON.stringify(bookList)); })
        .catch((error) => { return res.status(500).json({message: "Error getting book list"}); });
});

/*
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
 */

//TASK 11
public_users.get('/isbn/:isbn', function (req, res) {
	const isbn = req.params.isbn;

	const getBookByISBN = new Promise((resolve, reject) => {
		if (books[isbn]){
			resolve(books[isbn]);
		}else{
			reject("ISBN not found");
		}
	});

	getBookByISBN
		.then((book) => { return res.status(200).send(JSON.stringify(book)) })
		.catch((error) => { return res.status(404).json({ message: error }) });
});
  
/*
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
*/

//TASK 12
public_users.get('/author/:author', function (req, res) {
	const author = req.params.author;

	const getBooksByAuthor = new Promise((resolve, reject) => {
		const filteredBooks = Object.values(books).filter( (book) => book.author.toLowerCase() === author.toLowerCase() );
		if (filteredBooks.length > 0) {
			resolve(filteredBooks);
		}else{
			reject("Author not found");
		}
	});

	getBooksByAuthor
		.then((booksWithAuthor) => { return res.status(200).send(JSON.stringify(booksWithAuthor)) })
		.catch((error) => { return res.status(404).json({ message: error }) });
});

/*
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
*/

//TASK 13
public_users.get('/title/:title', function (req, res) {
	const title = req.params.title;

	const getBooksByTitle = new Promise((resolve, reject) => {
		const filteredBooks = Object.values(books).filter((book) => book.title.toLowerCase() === title.toLowerCase());
		if (filteredBooks.length > 0) {
			resolve(filteredBooks);
		}else{
			reject("Title not found");
		}
	});

	getBooksByTitle
		.then((booksWithTitle) => { return res.status(200).send(JSON.stringify(booksWithTitle)) })
		.catch((error) => { return res.status(404).json({ message: error }) });
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
