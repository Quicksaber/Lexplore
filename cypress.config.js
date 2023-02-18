const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      arghtHrtUrl: "https://logindev.lexplore.com/go/_lWzN4L7WE6fd27myClfcg",
      dfgsdfgSdfvtUrl:
        "https://logindev.lexplore.com/go/lEdjrRdX7EueP3JJ2LSWQA",
      alvaTannerUrl: "https://logindev.lexplore.com/go/31U2EJn9ekWXzTjjdiLD_A",
      oneTwoThreeUrl: "https://logindev.lexplore.com/go/Yj5mqth4TE6lmlOHUFBJzw",
      apiUrl: "https://readingservicesdev.lexplore.com/",
      gBooksApiUrl: "https://www.googleapis.com/books/v1/volumes",
    },
    video: false,
  },
});
