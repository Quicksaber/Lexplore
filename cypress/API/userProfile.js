import { colorValidation } from "../support/apiValidation";
import booksData from "../fixtures/booksData.json";
import generator from "../support/generator";
import data from "../fixtures/data.json";

module.exports = {
  getUserProfile({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
  }) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}students/profile`,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
      });
  },

  searchBooks({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    title = generator.randomStringGenerator(4),
  }) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("gBooksApiUrl")}?q=${title.replaceAll(" ", "%20")}`,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        let res = response.body.items[0].volumeInfo;
        // booksData.book1.authors = res.authors;
        // booksData.book1.title = res.title;
        // booksData.book1.numberOfPages = res.pageCount;
        return res;
      });
  },

  addBook({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    title = booksData.book1.title,
    authors = booksData.book1.authors,
    format = booksData.book1.format,
  }) {
    return cy.request({
      method: "PUT",
      url: `${Cypress.env("apiUrl")}books`,
      body: {},
    });
  },
};
