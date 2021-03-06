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
    const books = Store.getBooks();

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

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#book-form').reset();
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const bookForm = document.querySelector('#book-form');
    bookForm.parentNode.insertBefore(div, bookForm);

    // Vanish in 3 seconds
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}

// Store Class: Handles Storage (you can't store objects in local storage, it has to be a key-value paired string)
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books')); // so we can use it as a js object/array
    }

    return books
  }

  static addBook(book) {
    const books = Store.getBooks();

    // insert book into books array returned from getBooks()
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    // insert book into books array returned from getBooks()
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

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

  // Validations before adding book
  if (title == '' || author == '' || isbn == '') {
    UI.showAlert('Fill in all fields', 'danger');
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Clear fields after submission
    UI.clearFields();

    // Add book to Store
    Store.addBook(book);

    // Flash message book added
    UI.showAlert('Book added!', 'success');
  }
});

// Event: Remove a Book, note: we attach the eventlistener on the parent so that newly created books can also be deleted
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Delete book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Flash message book deleted
  UI.showAlert('Book deleted!', 'success');
});
