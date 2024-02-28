const request = require("supertest")
const app = require("../app")
const URL_BASE ='/users'
let TOKEN

let userId
const user = {
    firstName: "rene",
    lastName:"Ribera",
    email:"rene@gmail.com",
    password:"rene1234",
    phone: "997900200"
}

beforeAll(async()=>{
    const user ={
        email: "fernando@gmail.com",
        password: 'fernando1234',
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)
//  console.log(res.body)
 TOKEN = res.body.token 
})

test("get", async()=>{
    const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)


})

test ("POST -> 'URL_BASE', should retunr status code 201, res.body  ", async()=>{
    const res =await request(app)
    .post(URL_BASE)
    .send(user)

    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test ("put", async ()=>{
    const res = await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send({ firstName: "jeal"})
    .set("Authorization", `Bearer ${TOKEN}` )

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("jeal")
})


test("post  login", async()=>{
    const userLogin = {
        email:"rene@gmail.com",
        password:"rene1234",
    }
    const res =await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()

})


test("POST -> 'URL_BASE/login', should return status code 401", async () => {
    const userLogin = {
      email: 'rene@gmail.com',
      password: 'invalid password'
    }
  
    const res = await request(app)
      .post(`${URL_BASE}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(401)
  })

test("delete", async()=>{
    const res = await request(app)
    .delete(`${URL_BASE}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
    // expect(res.body).toBeDefined()
    // expect(res.body.user).toBe(null)
})
