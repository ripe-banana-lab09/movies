# LAB - 09

## Project Name
Ripe-Banana

### Author: Student/Group Name
John Nelson and Donna Lambert

### Links and Resources
* [submission PR](https://github.com/ripe-banana-lab09/movies/pull/2)
* [travis](https://travis-ci.com/ripe-banana-lab09/movies/builds/129747126)


#### Documentation
<!-- * [api docs](http://xyz.com) (API servers) -->


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://heroku_zz3qzv1m:h5qgradc1ck9v7riuch8v3jh4n@ds227808.mlab.com:27808/heroku_zz3qzv1m

**or, include an `.env.example`**

#### Running the app

**Describe what npm scripts do**
  pretest
    npm run lint
  test
    npm run jest -- --coverage
  start
    node server.js

available via `npm run-script`:
  lint
    eslint .
  jest
    jest --runInBand
  test:watch
    npm run jest -- --watchAll
  test:verbose
    npm run test -- --verbose
  start:watch
    nodemon server.js
  
#### Tests
* Model Tests, tests valid models for  
	-actor, film, reviewer, review, studio.
* Routes testing, tests API routes for  
  -actors, films, reviews, reviewers, studios. 
* app.test  
  Tests the API routes and CRUD functionality.

#### UML
Link to an image of the UML for your application and response to events

