process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const articles = require("../db/data/test-data/articles");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("/api", () => {
  describe("/topics", () => {
    test("GET /api/topics responds with an array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toEqual([
            { slug: "mitch", description: "The man, the Mitch, the legend" },
            { slug: "cats", description: "Not dogs" },
            { slug: "paper", description: "what books are made of" },
          ]);
        });
    });
    test("GET /api/notaroute responds with 404 and route not ffound message", () => {
      return request(app)
        .get("/api/notaroute")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("route not found");
        });
    });
  });
  describe("/users", () => {
    it("GET /api/users/:username responds with the correct object depending on the username ", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            user: {
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            },
          });
        });
    });
    test("GET /api/users/:username responds with 404 if the route is incorrect", () => {
      return request(app)
        .get("/api/users/aa")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("route not found");
        });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      describe("/comments", () => {
        it("POST request responds with posted comment", () => {
          return request(app)
            .post("/api/articles/9/comments")
            .send({
              author: "butter_bridge",
              body: "absolutely great!",
              article_id: 9,
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment[0].author).toBe("butter_bridge");
              expect(body.comment[0].body).toBe("absolutely great!");
            });
        });
        it(" POST request responds with 400 status code when input in one of the required fields is invalid", () => {
          return request(app)
            .post("/api/articles/9/comments")
            .send({
              author: "butter_bridge",
              body: "absolutely great!",
              article_id: "hhfh",
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("bad request");
            });
        });
        it(" POST request responds with 400 if required field is left empty", () => {
          return request(app)
            .post("/api/articles/9/comments")
            .send({
              author: "butter_bridge",
              article_id: 9,
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("bad request");
            });
        });
        it("POST request responds with 400 if column is incorrect", () => {
          return request(app)
            .post("/api/articles/9/comments")
            .send({
              body: "absolutely great!",
              author: "butter_bridge",
              article_i: 9,
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("bad request");
            });
        });
        it("POST request responds with 400 if article does not exist", () => {
          return request(app)
            .post("/api/articles/9/comments")
            .send({
              body: "absolutely great!",
              author: "butter_bridge",
              article_id: 10000,
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("bad request");
            });
        });
        it("GET request responds with an array of sorted comments which defaults to descending order for the given article", () => {
          return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual({
                comments: [
                  {
                    comment_id: 1,
                    body:
                      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                    article_id: 9,
                    author: "butter_bridge",
                    votes: 16,
                    created_at: "2017-11-22T12:36:03.389Z",
                  },
                  {
                    comment_id: 17,
                    body: "The owls are not what they seem.",
                    article_id: 9,
                    author: "icellusedkars",
                    votes: 20,
                    created_at: "2001-11-26T12:36:03.389Z",
                  },
                ],
              });
              expect(body).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        it("GET request responds with an array of sorted comments depending on the column in the query for the given article", () => {
          return request(app)
            .get("/api/articles/9/comments?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual({
                comments: [
                  {
                    comment_id: 17,
                    body: "The owls are not what they seem.",
                    article_id: 9,
                    author: "icellusedkars",
                    votes: 20,
                    created_at: "2001-11-26T12:36:03.389Z",
                  },
                  {
                    comment_id: 1,
                    body:
                      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                    article_id: 9,
                    author: "butter_bridge",
                    votes: 16,
                    created_at: "2017-11-22T12:36:03.389Z",
                  },
                ],
              });
              expect(body).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
        it("GET request responds with an array of descending comments or ascending based on the query but defaults descending", () => {
          return request(app)
            .get("/api/articles/9/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual({
                comments: [
                  {
                    comment_id: 17,
                    body: "The owls are not what they seem.",
                    article_id: 9,
                    author: "icellusedkars",
                    votes: 20,
                    created_at: "2001-11-26T12:36:03.389Z",
                  },
                  {
                    comment_id: 1,
                    body:
                      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                    article_id: 9,
                    author: "butter_bridge",
                    votes: 16,
                    created_at: "2017-11-22T12:36:03.389Z",
                  },
                ],
              });
              expect(body).toBeSortedBy("created_at");
            });
        });
        test("GET request responds with 404 when endpoint is valid but but the route is incorrect", () => {
          return request(app)
            .get("/api/articles/1000008/comments")
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe("route not found");
            });
        });
        test("GET request responds with 400 when endpoint is in invalid", () => {
          return request(app)
            .get("/api/articles/aasd/comments")
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe("bad request");
            });
        });
      });

      it("GET request responds with the correct object depending on the article_id ", () => {
        return request(app)
          .get("/api/articles/9")
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual({
              Article: {
                article_id: 9,
                title: "They're not exactly dogs, are they?",
                topic: "mitch",
                author: "butter_bridge",
                body: "Well? Think about it.",
                created_at: "1986-11-23T12:21:54.171Z",
                votes: 0,
                comment_count: "2",
              },
            });
          });
      });
      test("GET request responds with 404 when the route is incorrect", () => {
        return request(app)
          .get("/api/articles/1000008")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("route not found");
          });
      });
      test("GET request responds with 400 when endpoint is in invalid", () => {
        return request(app)
          .get("/api/articles/aasd")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("bad request");
          });
      });
      it("PATCH request increments votes depending whats been patched ", () => {
        return request(app)
          .patch("/api/articles/9")
          .send({ inc_votes: 5 })
          .expect(200)
          .then(({ body }) => {
            expect(body.Article.votes).toBe(5);
          });
      });
      test("PATCH request responds with 404 when the route is incorrect", () => {
        return request(app)
          .patch("/api/articles/1000008")
          .send({ inc_votes: 5 })
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("route not found");
          });
      });
      test("PATCH request responds with 400 when endpoint is in invalid", () => {
        return request(app)
          .patch("/api/articles/aasd")
          .send({ inc_votes: 5 })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("bad request");
          });
      });
      test("PATCH request responds with 400 when input is invalid", () => {
        return request(app)
          .patch("/api/articles/9")
          .send({ inc_votes: "hdhd" })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("bad request");
          });
      });
    });
    it("GET request responds with an array of articles with all the properties including comment count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(12);
          expect(Object.keys(response.body[0])).toEqual([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count",
          ]);
          expect(response.body[0].comment_count).toBe("13");
        });
    });
    it("GET request  responds with an array of sorted comments depending on the column in the query for the given article and defaults to date and descending comments or ascending based on the query but defaults descending", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toEqual({
            article_id: 12,
            title: "Moustache",
            body: "Have you seen the size of that thing?",
            votes: 0,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "1974-11-26T12:21:54.171Z",
            comment_count: "0",
          });
          expect(body[body.length - 1]).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13",
          });
          expect(body).toBeSortedBy("created_at");
        });
    });
    it("GET request  responds with filtered array if queried with topic or author", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars&topic=mitch")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([
            {
              article_id: 2,
              author: "icellusedkars",
              body:
                "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              comment_count: "0",
              created_at: "2014-11-16T12:21:54.171Z",
              title: "Sony Vaio; or, The Laptop",
              topic: "mitch",
              votes: 0,
            },
            {
              article_id: 3,
              author: "icellusedkars",
              body: "some gifs",
              comment_count: "0",
              created_at: "2010-11-17T12:21:54.171Z",
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              votes: 0,
            },
            {
              article_id: 6,
              author: "icellusedkars",
              body: "Delicious tin of cat food",
              comment_count: "1",
              created_at: "1998-11-20T12:21:54.171Z",
              title: "A",
              topic: "mitch",
              votes: 0,
            },
            {
              article_id: 7,
              author: "icellusedkars",
              body: "I was hungry.",
              comment_count: "0",
              created_at: "1994-11-21T12:21:54.171Z",
              title: "Z",
              topic: "mitch",
              votes: 0,
            },
            {
              article_id: 8,
              author: "icellusedkars",
              body:
                "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
              comment_count: "0",
              created_at: "1990-11-22T12:21:54.171Z",
              title: "Does Mitch predate civilisation?",
              topic: "mitch",
              votes: 0,
            },
            {
              article_id: 11,
              author: "icellusedkars",
              body:
                "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
              comment_count: "0",
              created_at: "1978-11-25T12:21:54.171Z",
              title: "Am I a cat?",
              topic: "mitch",
              votes: 0,
            },
          ]);
        });
    });
  });
  describe("/comments", () => {
    it("PATCH request increments votes depending whats been patched ", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -5 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).toBe(11);
        });
    });
    test("PATCH request responds with 404 when endpoint is valid but but the route is incorrect", () => {
      return request(app)
        .patch("/api/comments/1000008")
        .send({ inc_votes: 5 })
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("route not found");
        });
    });
    test("PATCH request responds with 400 when endpoint is in invalid", () => {
      return request(app)
        .patch("/api/comments/aasd")
        .send({ inc_votes: 5 })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("PATCH request responds with 400 when input is invalid", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "hdhd" })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });

    it("DELETE request deletes comment of particular id then send 204 ", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("DELETE request responds with 404 when endpoint is valid but but the route is incorrect", () => {
      return request(app).delete("/api/comments/1000008").expect(404);
    });
  });
});
