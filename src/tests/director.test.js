const request = require('supertest')
const app = require('../app')


const URL_DIRECTORS = '/directors'

const director = {
    firstName: "Michael",
    lastName: "Sucsy",
    nationality: "Estadounidense",
    image: "https://www.bing.com/images/search?view=detailV2&ccid=27AQsLky&id=4D400020F446280DDC55E649D0A3E26CE0F093F2&thid=OIP.27AQsLky3s6IfP_Qe1_4-gHaOG&mediaurl=https%3a%2f%2fm.media-amazon.com%2fimages%2fM%2fMV5BMTM4ODQ1NDI2MF5BMl5BanBnXkFtZTcwMDU0Mzc3NA%40%40._V1_UY1200_CR135%2c0%2c630%2c1200_AL_.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.dbb010b0b932dece887cffd07b5ff8fa%3frik%3d8pPw4Gzio9BJ5g%26pid%3dImgRaw%26r%3d0&exph=1200&expw=630&q=michael+sucsy&simid=608034620951046139&FORM=IRPRST&ck=47C4EAB526435C53747E3B1B6A82ECC3&selectedIndex=0&itb=0&qpvt=michael+sucsy",
    birthday: "1973-02-14"
}

let directorId

test("POST -> 'URL_DIRECTORS' should return statusCode 201, and res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET ALL-> '/URL_DIRECTORS' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> '/URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be director.firstName", async () => {
    
    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT -> '/URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be Thomas", async () => {
    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorId}`)
        .send({firstName:"Thomas"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Thomas")
})

test("DELETE -> '/URL_DIRECTORS/:id', should return statusCode 204", async () => {
    
    const res = await request(app)
        .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(204)
})