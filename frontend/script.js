document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const booksContainer = document.getElementById("booksContainer");
    
    // Search Books
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) return alert("Enter a title, author, or ISBN");
        
        fetch(`http://localhost:5000/api/books/title/${query}`)
            .then(response => response.json())
            .then(books => {
                booksContainer.innerHTML = books.map(book => `
                    <div class="book">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>ISBN: ${book.isbn}</p>
                        <button onclick="getReviews('${book.isbn}')">View Reviews</button>
                        <div id="reviews-${book.isbn}"></div>
                    </div>
                `).join("");
            })
            .catch(err => console.error(err));
    });
});

// Fetch and display book reviews
function getReviews(isbn) {
    fetch(`http://localhost:5000/api/books/${isbn}/review`)
        .then(response => response.json())
        .then(reviews => {
            document.getElementById(`reviews-${isbn}`).innerHTML = reviews.map(r => `<p>${r.user}: ${r.review}</p>`).join("");
        });
}
