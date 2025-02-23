document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});

function fetchBooks() {
    fetch("http://localhost:5000/api/books")
        .then(response => response.json())
        .then(books => {
            document.getElementById("booksContainer").innerHTML = books.map(book => `
                <div class="book">
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <button onclick="addReview('${book.isbn}')">Add Review</button>
                    <button onclick="deleteReview('${book.isbn}')">Delete My Review</button>
                </div>
            `).join("");
        });
}

function addReview(isbn) {
    const review = prompt("Enter your review:");
    const token = localStorage.getItem("token");

    if (!token) return alert("Login required!");

    fetch(`http://localhost:5000/api/books/${isbn}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify({ review })
    })
    .then(() => fetchBooks());
}

function deleteReview(isbn) {
    const token = localStorage.getItem("token");

    if (!token) return alert("Login required!");

    fetch(`http://localhost:5000/api/books/${isbn}/review`, {
        method: "DELETE",
        headers: { "Authorization": token }
    })
    .then(() => fetchBooks());
}
