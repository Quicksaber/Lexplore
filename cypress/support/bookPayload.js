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

  activityDataMaker(details, pagesRead) {
    let activity = {
      readingActivityData: {},
    };
    activity.readingActivityData.bookId = details.readingDiaryBookUuid;
    activity.readingActivityData.date = new Date();
    activity.readingActivityData.comment = generator.randomStringGenerator(5);
    activity.readingActivityData.difficultWords =
      generator.randomArrayOfStrings(3, 4);
    activity.readingActivityData.interestingWords =
      generator.randomArrayOfStrings(3, 6);
    activity.readingActivityData.readingCompanion =
      booksData.readingCompanion.none;
    activity.readingActivityData.likingLevel = Math.floor(Math.random() * 6);
    activity.readingActivityData.understandingLevel = Math.floor(
      Math.random() * 6
    );
    activity.readingActivityData.startPage = details.lastReadPage;
    activity.readingActivityData.numberOfPages = details.numberOfPages;
    activity.readingActivityData.minutesSpent =
      generator.randomNumberGenerator(2);
    activity.readingActivityData.readingSessionId =
      generator.randomStringGenerator(9);
    if (details.lastReadPage + pagesRead > details.numberOfPages) {
      activity.readingActivityData.endPage = details.numberOfPages;
    } else {
      activity.readingActivityData.endPage = details.lastReadPage + pagesRead;
    }
  },
};
