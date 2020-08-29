// Book Class: Represents a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class: Handle UI Tasks
class UI {
	// we didn't want to instantiate the ui class, hence we decided to make all the methods static
	static displayBooks() {
		const StoredBooks = [
			{
				title: 'Book One',
				author: 'John Doe',
				isbn: '34344',
			},
			{
				title: 'Book Two',
				author: 'Jane Doe',
				isbn: '45545',
			}
		];

		const books = StoredBooks;

		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;

		list.appendChild(row);
	}

	static clearFields() {
		document.querySelector('#book-form').reset();
	}
}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', () => UI.displayBooks());

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent form submission
	e.preventDefault();

	// Get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	// Instantiate book
	const book = new Book(title, author, isbn);

	// Add book to UI
	UI.addBookToList(book);

	// Clear fields after submission
	UI.clearFields();
});

// Event: Remove a Book

