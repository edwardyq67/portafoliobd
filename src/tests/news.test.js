const request=require('supertest')
const app=require('../app')
const Category = require('../models/Category')
const NewsImg = require('../models/NewsImg')
require('../models/index')
let token
let NewsId
beforeAll(async()=>{
    const credenciales={
        email: "luciana@gmail.com",
        password:"luciana1234"
    }
    const res=await request(app).post('/user/login').send(credenciales)
    token=res.body.token
})
test('POST /news', async () => {
    const categry=await Category.create({name:"tecnologia"})
    const postNews={
    headline:"php",
    lead:"php lenguaje  de programacion",
    author:"edward",
    body:"php txt body",
    categoryId:categry.id
    }
    const res=await request(app).post('/news').send(postNews).set('Authorization',`Bearer ${token}`)
    NewsId=res.body.id
    await categry.destroy()
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
});
test('GET /news', async () => {
    const res=await request(app).get('/news')
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});
test('POST /news/:id/newsImg', async () => { 
    const images=await NewsImg.create({
        url:'https://www.google.es/',
        publicId:"hjakksmk"
    })
    const res=await request(app).post(`/news/${NewsId}/images`).send([images.id]).set('Authorization',`Bearer ${token}`)
    await images.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
 })
test('PUT /news', async () => {
    const PutNews={
        headline:"php"
    }
    const res=await request(app).put(`/news/${NewsId}`).send(PutNews).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.headline).toBe(PutNews.headline)
});
test('DELETE /news', async () => {
    const res=await request(app).delete(`/news/${NewsId}`).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204)

});