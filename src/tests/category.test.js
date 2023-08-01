const request=require('supertest')
const app=require('../app')
let token
let idCategory
beforeAll(async()=>{//entrar lo logeado
    const credenciales={
        email: "luciana@gmail.com",
        password:"luciana1234"
    }
    const res=await request(app).post('/user/login').send(credenciales)
    token=res.body.token
})
test('POST  /category', async () => {
    const PostCategory={
        name:"tecnologia"
    }
    const res=await request(app).post('/category').send(PostCategory).set('Authorization',`Bearer ${token}`)
    idCategory=res.body.id
    expect(res.status).toBe(201); //created status code
    expect(res.body.id).toBeDefined()
});
test('GET /category ', async () => {
    const res=await request(app).get('/category').set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});
test('PUT /category', async () => {
    const PutCategory={
        name:"deportes"
    }
    const res=await request(app).put(`/category/${idCategory}`).send(PutCategory).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(PutCategory.name)
});
test('DELETE /category', async () => {
    const res=await request(app).delete(`/category/${idCategory}`).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204)
});