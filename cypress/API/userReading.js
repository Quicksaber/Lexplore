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
        let res = response.body.items[bookNumber].volumeInfo;
        return res;
      });
  },

  addBook({
    statusCode = 200,
    testMessage = Cypress.currentTest.title,
    book = booksData.validBook1,
    // title = booksData.book1.title,
    // authors = booksData.book1.authors,
    // pageNumber = booksData.book1.numberOfPages,
    // isbn = data.strings.emptyString,
    // genres = data.arrays.emptyArray,
    // format = booksData.format.paper,
    // readingType = booksData.readingType.freeReading,
  }) {
    return cy
      .request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}books`,
        body: book,
        // {
        // format: format,
        // title: title,
        // isbn: isbn,
        // genres: genres, // kad nema zanr, izbaci gresku ali napravi knjigu
        // authors: authors,
        // readingType: readingType,
        // numberOfPages: pageNumber,
        // },
      })
      .then((response) => {
        colorValidation(response, testMessage, statusCode);
        console.log(response.body);
      });
  },
};
