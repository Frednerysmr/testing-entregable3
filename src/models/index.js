const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//Table pivot -> movieGenre
Movie.belongsToMany(Genre, {through: 'movieGenre'})
Genre.belongsToMany(Movie, {through: 'movieGenre'})

//Table pivot -> movieDirector
Movie.belongsToMany(Director, {through: 'movieDirector'})
Director.belongsToMany(Movie, {through: 'movieDirector'})

//Table pivot -> movieActor
Movie.belongsToMany(Actor, {through: 'movieActor'})
Actor.belongsToMany(Movie, {through: 'movieActor'})