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
    bookNumber = 0,
  }) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("gBooksApiUrl")}?q=${title.replaceAll(" ", "%20")}`,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        return response.body.items[bookNumber].volumeInfo;
      });
  },

  addBook({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    book = booksData.validBook1,
  }) {
    return cy
      .request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}books`,
        body: book,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        return response.body.bookId;
      });
  },

  getBookDetails({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    bookId = data.strings.emptyString,
  }) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}books/${bookId}/details`,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        return response.body;
      });
  },

  getReadingActivity({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    bookId = data.strings.emptyString,
  }) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}books/${bookId}/readingActivity`,
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        return response.body;
      });
  },

  logReading({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    bookId = data.strings.emptyString,
    lastReadPage = 0,
    numberOfPages = generator.randomNumberGenerator(3),
  }) {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}user/readProgress`,
      body: booksData.activityData,
    });
  },
};
