const express = require("express");
const { getBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle, addReview, deleteReview } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBooks);
router.get("/:isbn", getBookByISBN);
router.get("/author/:author", getBooksByAuthor);
router.get("/title/:title", getBooksByTitle);
router.post("/:isbn/review", authMiddleware, addReview);
router.delete("/:isbn/review", authMiddleware, deleteReview);

module.exports = router;
