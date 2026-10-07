# Library Books REST API

This API manages a library's books using RESTful endpoints.

## 1. List all books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns a list of all books.
- **Success status:** 200 OK

## 2. Get one book

- **Method:** GET
- **Path:** `/books/42`
- **Description:** Returns the book with ID 42.
- **Success status:** 200 OK

## 3. Create a book

- **Method:** POST
- **Path:** `/books`
- **Description:** Creates a new book.
- **Request body:**
```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe"
}
