import userProfile from "../../API/userProfile";
import booksData from "../fixtures/booksData.json";

describe("add book flow", () => {
  beforeEach(() => {
    cy.sessionLogin();
  });

  it("API-PO-01 Get existing user profile", () => {
    userProfile.getUserProfile({});
  });

  let book = booksData.book1;
  it.only("API-PO-02 Book search with valid random string", () => {
    userProfile.searchBooks({});
    console.log(book);
  });
});
