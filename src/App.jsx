import { useState, useEffect } from "react";

function BookList() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=javascript"
        );

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const json = await response.json();
        setBooks(json.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (books && books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;