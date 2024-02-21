const request = require("supertest")
const app = require("../app")
const URL_BASE ='/users'
const user = {
    firstName: "rene",
    lastName:"Ribera",
    email:"rene@gmail.com",
    password:"rene1234",
    phone: "997900200"
}
test ("POST -> 'URL_BASE', should retunr status code 201, res.body  ", async()=>{
    const res =await request(app)
    .post(URL_BASE)
    .send(user)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})