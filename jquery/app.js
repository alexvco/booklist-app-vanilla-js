$(document).ready(function() {
  // storage: get
  function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books')); // so we can use it as a js object/array
    }

    return books
  };

  // storage: add
  function addBook(book) {
    const books = getBooks();

    // insert book into books array returned from getBooks()
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  // storage: remove
  function removeBook(isbn) {
    const books = getBooks();

    // insert book into books array returned from getBooks()
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  // UI: display books
  function displayBooks() {
    const books = getBooks();

    books.forEach(function(book) {
      addBookToList(book)
    });
  };

  // UI: add book
  function addBookToList(book) {
    const $list = $('#book-list');

    const $row = $('<tr></tr>');

    $row.html( `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `);

    $list.append($row);
  };

  // UI: remove book
  function deleteBook(el) {
    el.parent().parent().remove(); // you receive a tag object and need to remove tr object
  };

  // UI: show alert
  function showAlert(message, className) {
    const $div = $('<div></div>');
    $div.attr('class', `alert alert-${className}`);
    $div.text(message);

    const $bookForm = $('#book-form');
    $bookForm.before($div);

    // Vanish in 3 seconds
    setTimeout(function() {
      $div.remove();
    }, 3000);
  };

  // Event: Add a Book
  $('#book-form').on('submit', function(e) {
    // Prevent form submission
    e.preventDefault();

    // Get form values
    const title = $('#title').val();
    const author = $('#author').val();
    const isbn = $('#isbn').val();

    // Validations before adding book
    if (title == '' || author == '' || isbn == '') {
      showAlert('Fill in all fields', 'danger');
    } else {
      // create book object
      const book = {
        title: title,
        author: author,
        isbn: isbn,
      }

      // Add book to UI
      addBookToList(book);

      // Clear fields after submission
      $(this).trigger("reset");

      // Add book to storage
      addBook(book);

      // Flash message book added
      showAlert('Book added!', 'success');
    }
  });

  // Event: Remove a Book, see notes at the bottom
  $('#book-list').on('click', '.delete', function(e) {
    // Remove book from UI
    const $el = $(e.target); // a tag object
    deleteBook($el);

    // Delete book from Store
    const isbn = ($el.parent().prev().text());
    removeBook(isbn);

    // Flash message book deleted
    showAlert('Book deleted!', 'success');
  });

  // Event: call displayBooks when document is ready to display the books
  displayBooks();
});




// Notes

// If you want the click handler to work for an element that gets loaded dynamically,
// then you set the event handler on a parent object (that does not get loaded dynamically)
// and give it a selector that matches your dynamic object like this:

// $('#parent').on("click", "#child", function() {});

// The event handler will be attached to the #parent object and anytime a click event bubbles up to it that originated on #child,
// it will fire your click handler. This is called delegated event handling (the event handling is delegated to a parent object).

// It's done this way because you can attach the event to the #parent object even when the #child object does not exist yet,
// but when it later exists and gets clicked on, the click event will bubble up to the #parent object,
// it will see that it originated on #child and there is an event handler for a click on #child and fire your event.



// With jQuery
// Handle click events .search-result elements,
// even when they're added to the DOM programmatically

  // $(".search-container").on("click", ".search-result", handleClick);




// Without jQuery
// Create and add an element to the DOM

  // var searchElement = document.createElement("div");
  // document.querySelector(".search-container").appendChild(searchElement);

// Add an event listener to the element
  // searchElement.addEventListener("click", handleClick);




// Great resource from moving to jquery to vanilla js
// https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#working-with-events
