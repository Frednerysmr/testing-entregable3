const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Director, Actor]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {include: [Genre, Director, Actor]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenre = catchError(async(req,res) => {
    //buscamos la movie
    const {id} = req.params
    const movie = await Movie.findByPk(id)

    //en caso de que no se encuentre
    if(!movie) return res.sendStatus(404)

    //Seteo los geners a las movie
    await movie.setGenres(req.body)

    //leer los genereos que setee, con el objetivo de retornarlos
    const genres = await movie.getGenres()

    return res.json(genres)

});

const setDirector = catchError(async(req,res) => {
    //buscamos la movie
    const {id} = req.params
    const movie = await Movie.findByPk(id)

    //en caso de que no se encuentre
    if(!movie) return res.sendStatus(404)

    //Seteo los geners a las movie
    await movie.setDirectors(req.body)

    //leer los genereos que setee, con el objetivo de retornarlos
    const directors = await movie.getDirectors()

    return res.json(directors)

});

const setActor = catchError(async(req,res) => {
    //buscamos la movie
    const {id} = req.params
    const movie = await Movie.findByPk(id)

    //en caso de que no se encuentre
    if(!movie) return res.sendStatus(404)

    //Seteo los geners a las movie
    await movie.setActors(req.body)

    //leer los genereos que setee, con el objetivo de retornarlos
    const actors = await movie.getActors()

    return res.json(actors)

});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenre,
    setDirector,
    setActor,
}