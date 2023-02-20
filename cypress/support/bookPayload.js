import generator from "./generator";
import data from "../fixtures/data.json";
import booksData from "../fixtures/booksData.json";

module.exports = {
  bookMaker(volumeInfo) {
    let book = {};
    book.format = booksData.format.paper;
    book.title = volumeInfo.title;

    if (volumeInfo.hasOwnProperty("industryIdentifiers")) {
      volumeInfo.industryIdentifiers.forEach((item, index) => {
        if (item.type === "ISBN_13") {
          book.isbn = volumeInfo.industryIdentifiers[index].identifier;
        } else {
          book.isbn = data.strings.emptyString;
        }
      });
    } else {
      book.isbn = data.strings.emptyString;
    }

    book.genres = volumeInfo.categories;
    book.authors = volumeInfo.authors;

    if (volumeInfo.hasOwnProperty("publisher")) {
      book.publisher = volumeInfo.publisher;
    } else {
      book.publisher = "";
    }

    book.readingType = booksData.readingType.freeReading;

    if (volumeInfo.hasOwnProperty("pageCount")) {
      book.numberOfPages = volumeInfo.pageCount;
    } else {
      book.numberOfPages = generator.randomNumberGenerator(3);
    }

    if (volumeInfo.hasOwnProperty("description")) {
      book.description = volumeInfo.description;
    }

    if (volumeInfo.hasOwnProperty("imageLinks")) {
      if (volumeInfo.imageLinks.hasOwnProperty("thumbnail")) {
        book.coverUrl = volumeInfo.imageLinks.thumbnail;
      }
    }

    return book;
  },
};
