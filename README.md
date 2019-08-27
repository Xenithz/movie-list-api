# movie-list-api

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

