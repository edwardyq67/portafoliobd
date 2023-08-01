const request=require('supertest')
const app=require('../app')
let idUser
let token
test('POST /user', async () => {
    const PostUser={
        firsName: "edward",
        lastName: "yllanes",
        email: "edward@gmail.com",
        password:"edward1234",
        phone: "1234567"
    }
    const res=await request(app).post('/user').send(PostUser)
   
    idUser=res.body.id
    expect(res.statusCode).toBe(201); //check if the status code is
    expect(res.body.id).toBeDefined()
});
test('LOGIN /user', async () => {
    const credenciales={
        email: "edward@gmail.com",
        password:"edward1234"
    }
    const res=await request(app).post('/user/login').send(credenciales)
    token=res.body.token
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
});
test('GET /user', async () => {
    const res=await request(app).get('/user').set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
});
test('PUT /user', async () => {
    const PutUser={
        firsName: "edward"
    }
    const res=await request(app).put(`/user/${idUser}`).send(PutUser).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.firsName).toBe(PutUser.firsName)
});

test('DELET /user', async () => {
    const res=await request(app).delete(`/user/${idUser}`).set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(204)

});
