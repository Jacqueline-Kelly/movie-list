DROP DATABASE IF EXISTS movies;

CREATE DATABASE movies;

USE movies;

-- SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
-- FROM information_schema.tables
-- WHERE table_schema = 'searched_movies';


CREATE TABLE searchedMovies (
  id INT NOT NULL UNIQUE,
  title VARCHAR(200),
  releaseDate VARCHAR(300),
  overview VARCHAR(500),
  rating VARCHAR(300),
  watched BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
  );