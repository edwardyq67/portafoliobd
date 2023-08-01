const request=require('supertest')
const app=require('../app')
const News = require('../models/News')
require('../models')

let idFavoritos
let token
beforeAll(async()=>{
    const credenciales={
        email: "luciana@gmail.com",
        password:"luciana1234"
    }
    const res=await request(app).post('/user/login').send(credenciales)
    token=res.body.token
})
test('POST /favoritos', async () => { 
    const newsId=await News.create({
        headline:"php",
        lead:"php lenguaje  de programacion",
        author:"edward",
        body:"php txt body"
    })
    const PostFavoritos={
        rate:5,     
        newsId:newsId.id
    }
    
    const res=await request(app).post('/favorite').send(PostFavoritos).set('Authorization',`Bearer ${token}`)
    newsId.destroy()
    idFavoritos=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
})
test('GET /favoritos', async () => { 
    const res=await request(app).get('/favorite').set('Authorization',`Bearer ${token}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
 })
 test('PUT /favorite', async () => { 
    const putFavorito={
        rate:4
    }
    const res=await request(app).put(`/favorite/${idFavoritos}`).send(putFavorito).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.rate).toBe(putFavorito.rate)
  })
  test('delete /favoritos', async () => { 
    const res=await request(app).delete(`/favorite/${idFavoritos}`).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204)
    
   })