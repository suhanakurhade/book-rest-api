const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book array
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// GET all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// POST add new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book by ID
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;

    res.status(200).json(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.status(200).json({ message: "Book deleted successfully" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
