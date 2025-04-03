const myLibrary = [];

function Book(author, title, pages, completed = "No") {
  // the constructor...
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.completed = completed;
}

Book.prototype.toggleFinishBook = function () {
  this.completed = "Yes";
  // return this.completed;
};

function addBookToLibrary(author, title, pages, completed = "No") {
  // take params, create a book then store it in the array
  const book = new Book(author, title, pages, completed);

  myLibrary.push(book);
}

addBookToLibrary("Denis Johnson", "Tree of Smoke", "123", "Yes");
addBookToLibrary("Ann Patchett", "Bel Canto", "526", "No");
addBookToLibrary("Emily St. John Mandel", "Station Eleven", "764", "Yes");
addBookToLibrary("Viet Thanh Nguyen", "The Sympathizer", "325", "No");
addBookToLibrary("Hanya Yanagihara", "A Little Life", "11");

const booksContainer = document.querySelector(".books tbody");

function displayBooks(books) {
  books.forEach((book) => {
    displayOneBook(book);
  });
}

function displayOneBook(book) {
  const booksHTML = `
  <tr book-id=${book.id}>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
    <td data-finished="${book.completed}" class="center">${book.completed}</td>
    <td><input type="checkbox" class="select-book-checkbox" /></td>
  </tr>`;

  booksContainer.innerHTML += booksHTML;
}

displayBooks(myLibrary);

const addBookDialog = document.querySelector("#add-book-dialog");
const addBookShowButton = document.querySelector("#add-book");
const addBookCloseButton = document.querySelector("#add-book-close-button");

addBookShowButton.addEventListener("click", () => addBookDialog.showModal());
addBookCloseButton.addEventListener("click", () => addBookDialog.close());

addBookDialog.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = Object.fromEntries(formData);
  book.pages = book.pages === "" ? 0 : parseFloat(book.pages);

  addBookToLibrary(book.author, book.title, book.pages);
  // display the book, it's going to be the last element in the books array
  displayOneBook(myLibrary[myLibrary.length - 1]);
  addBookDialog.close();
});

/* Remove the book */
const removeBook = document.querySelector("#remove-book");
removeBook.addEventListener("click", () => {
  // Get all checked checkboxes
  const checkedBoxes = document.querySelectorAll(
    ".select-book-checkbox:checked"
  );
  // Loop through each checked checkbox and remove its parent row
  checkedBoxes.forEach(function (checkbox) {
    const row = checkbox.closest("tr"); // Find the closest table row
    if (row) {
      row.remove(); // Remove the row from the DOM

      const bookId = row.getAttribute("book-id");
      const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
      myLibrary.splice(bookIndex, 1); // Remove the book from the myLibrary
    }
  });
});

/* Finish the book */

const finishBook = document.querySelector("#finish-book");
finishBook.addEventListener("click", () => {
  // Get all checked checkboxes
  const checkedBoxes = document.querySelectorAll(
    ".select-book-checkbox:checked"
  );

  // Loop through each checked checkbox and
  checkedBoxes.forEach(function (checkbox) {
    const row = checkbox.closest("tr"); // Find the closest table row
    if (row) {
      row.classList.add("finished");

      const bookId = row.getAttribute("book-id");
      const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

      myLibrary[bookIndex].toggleFinishBook();

      const bookFlag = row.querySelector("[data-finished]");
      bookFlag.textContent = "Yes";
    }
  });
});
