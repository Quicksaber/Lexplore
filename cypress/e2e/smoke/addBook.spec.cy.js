import user from "../../API/userReading";
import booksData from "../../fixtures/booksData.json";
import data from "../../fixtures/data.json";
import generator from "../../support/generator";
import bookPayload from "../../support/bookPayload";

describe("add book flow", () => {
  beforeEach(() => {
    cy.sessionLogin();
  });

  it("API-PO-01 Get existing user profile", () => {
    user.getUserProfile({});
  });

  it("API-PO-02 Book search with valid random string", () => {
    user.searchBooks({});
  });

  it("API-PO-03 Add book from search list", () => {
    user
      .searchBooks({
        // title: booksData.bookTitles.Hobbit,
        title: generator.randomStringGenerator(3),
      })
      .then((response) => {
        let book = bookPayload.bookMaker(response);
        user.addBook({
          book: book,
        });
      });
  });
  let bookId;
  it("API-P0-04 Add valid book", () => {
    user.addBook({}).then((response) => {
      bookId = response;
    });
  });

  it("Get book last read page", () => {
    user.getReadingActivity({
      bookId: bookId,
    });
  });

  it.only("test", () => {
    user.logReading({});
  });
});
