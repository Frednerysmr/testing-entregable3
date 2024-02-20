const request = require('supertest')
const app = require('../app')


const URL_GENRES = '/genres'

const genre = {
    name: "Romance"
}

let genreId

test("POST -> 'URL_GENRES' should return statusCode 201, and res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
        .post(URL_GENRES)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET ALL-> '/URL_GENRES' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_GENRES)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> '/URL_GENRES/:id', should return statusCode 200, res.body to be defined and res.body.name to be genre.name", async () => {
    
    const res = await request(app)
        .get(`${URL_GENRES}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("PUT -> '/URL_GENRES/:id', should return statusCode 200, res.body to be defined and res.body.name to be Drama", async () => {
    const res = await request(app)
        .put(`${URL_GENRES}/${genreId}`)
        .send({name:"Drama"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Drama")
})

test("DELETE -> '/URL_GENRES/:id', should return statusCode 204", async () => {
    
    const res = await request(app)
        .delete(`${URL_GENRES}/${genreId}`)

    expect(res.statusCode).toBe(204)
})