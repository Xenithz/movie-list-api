# movie-list-api
A small REST api with CRUD functionality that I made for practice. Uses KoaJs and PostgreSQL.
Since it's hosted on Heroku please give it some time as it takes awhile to initialize if it hasn't been used recently.

Currently only the movies section of the api has been integrated, the reviews section exists in the source code but will only be integrated once I have refactored the movies section.

When passing query params please name the params in the payload as they are mentioned in the routes section. So far I have only tested the queries with (application/x-www-form-urlencoded).

(https://bbiumovieapi.herokuapp.com/api/)

## Routes

| Routes      | HTTP req method      | Description   |
| ------------- | ------------- |:-------------:|
| /api/movies | GET | Returns all registered movies |
| /api/movies (QUERY title) | GET | Returns movie which matches title in request payload |
| /api/movies (QUERY genre) | GET | Returns movies which matches genre in request payload |
| /api/movies (QUERY director) | GET | Returns movie which matches director in request payload |
| /api/movies/:id | GET | Returns movie which matches id in parameter |
| /api/movies (QUERY movieid, movietitle, moviegenre, moviedirector)  | POST | Creates new movie from provided request payload |
| /api/movies/:id (QUERY movieid, movietitle, moviegenre, moviedirector)  | PUT | Updates or creates movie from provided request payload |
| /api/movies/:id | DELETE | Deletes movie which matches id in parameter |

## TODO

| TODO LIST|
| ---------- |
| Set up tests for movies section      |
