require('../models')
const request = require('supertest')
const app = require('../app')
const Genre = require('../models/Genre')
const Actor = require('../models/Actor')
const Director = require('../models/Director')


const URL_MOVIES = '/movies'

const movie = {
    name: "Votos de Amor",
    image: "https://th.bing.com/th/id/OIP.8_fMAGKd8ySutIFT1dJSPgHaK_?w=119&h=180&c=7&r=0&o=5&pid=1.7",
    synopsis: "Basada en hechos reales, cueta la historia de Paige y Leo, un joven y enamorado matrimonio de Chicago que sufre un accidente de auto, en el que Paige pierde la memoria",
    releaseYear: 2012
}

let movieId

test("POST -> 'URL_MOVIES' should return statusCode 201, and res.body to be defined and res.body.name = movie.name", async () => {
    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET ALL-> '/URL_MOVIES' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> '/URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name to be movie.name", async () => {
    
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT -> '/URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name to be Todos los días de mi vida", async () => {
    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send({name:"Todos los días de mi vida"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Todos los días de mi vida")
})

test("POST SETACTOR-> 'URL_MOVIES/:id/actors', should return status code 200 and...",async () => {
    const actor = await Actor.create({
        firstName: "Channing",
        lastName: "Tatum",
        nationality: "Estadounidense" ,
        image: "https://th.bing.com/th/id/OIP.E2nNS_AWgU8UvYngZhjT0wHaJ5?w=184&h=246&c=7&r=0&o=5&pid=1.7",
        birthday: "1980-04-26"
    })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([actor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(actor.id)

    await actor.destroy()

})

test("POST SETDIRECTOR-> 'URL_MOVIES/:id/directors', should return status code 200 and...",async () => {
    const director = await Director.create({
        firstName: "Michael",
        lastName: "Sucsy",
        nationality: "Estadounidense",
        image: "https://www.bing.com/images/search?view=detailV2&ccid=27AQsLky&id=4D400020F446280DDC55E649D0A3E26CE0F093F2&thid=OIP.27AQsLky3s6IfP_Qe1_4-gHaOG&mediaurl=https%3a%2f%2fm.media-amazon.com%2fimages%2fM%2fMV5BMTM4ODQ1NDI2MF5BMl5BanBnXkFtZTcwMDU0Mzc3NA%40%40._V1_UY1200_CR135%2c0%2c630%2c1200_AL_.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.dbb010b0b932dece887cffd07b5ff8fa%3frik%3d8pPw4Gzio9BJ5g%26pid%3dImgRaw%26r%3d0&exph=1200&expw=630&q=michael+sucsy&simid=608034620951046139&FORM=IRPRST&ck=47C4EAB526435C53747E3B1B6A82ECC3&selectedIndex=0&itb=0&qpvt=michael+sucsy",
        birthday: "1973-02-14"
    })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(director.id)

    await director.destroy()
})

test("POST SETGENRE-> 'URL_MOVIES/:id/genres', should return status code 200, res.body to be denined and...",async () => {

    const genre = await Genre.create({
        name: "Drama"
    })

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(genre.id)

    await genre.destroy()
})

test("DELETE -> '/URL_MOVIES/:id', should return statusCode 204", async () => {
    
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204)
})