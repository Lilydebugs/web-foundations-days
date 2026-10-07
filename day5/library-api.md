# Library Books REST API

## 1. List all books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns a list of all books.
- **Success status:** 200 OK## 2. Get one book

- **Method:** GET
- **Path:** `/books/42`
- **Description:** Returns the book with ID 42.
- **Success status:** 200 OK
- ## 3. Create a book

- **Method:** POST
- **Path:** `/books`
- **Description:** Creates a new book.
- **Request body:**
```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe"
}## 4. Update a book

- **Method:** PUT
- **Path:** `/books/42`
- **Description:** Updates the book with ID 42.
- **Request body:**
```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe"
}## 5. Delete a book

- **Method:** DELETE
- **Path:** `/books/42`
- **Description:** Deletes the book with ID 42.
- **Success status:** 204 No Content
## 6. List books by an author

- **Method:** GET
- **Path:** `/books?author=Chinua%20Achebe`
- **Description:** Returns books written by the specified author.
- **Success status:** 200 OK
## Error Codes

- **400 Bad Request:** Happens when the request contains invalid or missing data, such as creating a book without a title.
- **404 Not Found:** Happens when the requested book does not exist, such as requesting `/books/9999`.
