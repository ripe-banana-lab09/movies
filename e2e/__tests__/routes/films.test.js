const request = require('../../request');
const db = require('../../db');
const { matchMongoId } = require('../../match-helpers');

describe('Films Route Test', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('films'),
      db.dropCollection('actors'),
      db.dropCollection('studios'),
      db.dropCollection('reviews')
    ]);
  });
  const film = {
    title: 'Spider-man',
    studio: [],
    released: 2017,
    cast: [
      {
        role: 'Spider-man',
        actor: []
      }
    ]
  };

  const actor = {
    name: 'Tom Holland',
    dob: '1996-06-01',
    pob: 'United Kingdom'
  };

  const studio = {
    name: 'Marvel',
    address: {
      city: 'Burbank',
      state: 'California',
      country: 'USA'
    }
  };

  const review = {
    rating: 5,
    review: 'It was gud',
    reviewer: []
  };

  const reviewer = {
    name: 'Roger Ebert',
    company: 'Sun'
  };

  function postFilm(film) {
    return Promise.all([
      request
        .post('/api/actors')
        .send(actor)
        .expect(200)
        .then(({ body }) => body),
      request
        .post('/api/studios')
        .send(studio)
        .expect(200)
        .then(({ body }) => body)
    ])
      .then(([actor, studio]) => {
        film.cast[0].actor = actor._id;
        film.studio = studio._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  function postReview(review) {
    return request
      .post('/api/reviewers')
      .send(reviewer)
      .expect(200)
      .then(reviewer => {
        review.reviewer = reviewer._id;
        return request
          .post('/api/reviews')
          .send(review)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  it('posts a film', () => {
    return postFilm(film).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          ...matchMongoId,
          cast: [
            {
              _id: expect.any(String),
              actor: expect.any(String)
            }
          ],
          studio: expect.any(String)
        },

        `
        Object {
          "__v": 0,
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "cast": Array [
            Object {
              "_id": Any<String>,
              "actor": Any<String>,
              "role": "Spider-man",
            },
          ],
          "released": 2017,
          "studio": Any<String>,
          "title": "Spider-man",
        }
      `
      );
    });
  });
  it('Gets a film by ID', () => {
    return postFilm(film).then(film => {
      review.film = film._id;
      return postReview(review)
        .then(review => {
          return request.get(`/api/films/${review.film}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              ...matchMongoId,
              cast: [
                {
                  _id: expect.any(String),
                  actor: expect.any(String)
                }
              ],
              reviews: {
                _id: expect.any(String)
              },
              studio: {
                _id: expect.any(String)
              }
            },
            `
            Object {
              "__v": 0,
              "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
              "cast": Array [
                Object {
                  "_id": Any<String>,
                  "actor": Any<String>,
                  "role": "Spider-man",
                },
              ],
              "released": 2017,
              "reviews": Object {
                "_id": Any<String>,
                "rating": 5,
                "review": "It was gud",
              },
              "studio": Object {
                "_id": Any<String>,
                "name": "Marvel",
              },
              "title": "Spider-man",
            }
          `
          );
        });
    });
  });
  it('Deletes a Film', () => {
    return postFilm(film).then(film => {
      return request.delete(`/api/films/${film._id}`).expect(200);
    });
  });
});
