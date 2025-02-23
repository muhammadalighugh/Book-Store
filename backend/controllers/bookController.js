const Book = require("../models/bookModel");

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookByISBN = async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  res.json(book || { message: "Book not found" });
};

exports.getBooksByAuthor = async (req, res) => {
  const books = await Book.find({ author: req.params.author });
  res.json(books);
};

exports.getBooksByTitle = async (req, res) => {
  const books = await Book.find({ title: req.params.title });
  res.json(books);
};

exports.addReview = async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews.push({ user: req.user.username, review: req.body.review });
  await book.save();
  res.json(book);
};

exports.deleteReview = async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews = book.reviews.filter((r) => r.user !== req.user.username);
  await book.save();
  res.json(book);
};
