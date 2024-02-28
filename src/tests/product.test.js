const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")
require(`../models`)

const URL_BASE = '/products'
const URL_BASE_USERS = '/users/login'
let TOKEN
let category
let product
let productId

beforeAll(async()=>{
    //login
    const user ={
        email: "fernando@gmail.com",
        password: 'fernando1234',
    }

    const res = await request(app)
    .post(URL_BASE_USERS)
    .send(user)
    TOKEN = res.body.token 

    // creacion de los productos de primera instancia 
    category = await Category.create({name:"tecnologia"})
    
    product = {
        title: "s21",
        decription:"celular sansung",
        price:1230,
        categoryId: category.id
    }
})


test("post", async()=>{
    const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    
})


test("get", async()=>{
    const res = await request(app)
    .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)

})

test ("get one", async()=>{
const res =await  request(app)
    .get (`${URL_BASE}?category=${category.id}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)

   
})



test("GET -> 'URL_BASE/:productId'", async () => {
    const res = await request(app)
      .get(`${URL_BASE}/${productId}`)
  
   // console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
  
  
    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)
  
  
  
  })
  
  test("PUT -> 'URL_BASE/productId', ", async () => {
  
    const res = await request(app)
      .put(`${URL_BASE}/${productId}`)
      .send({ title: "Ropa" })
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe('Ropa')
  
  })
  
  test("DELETE", async () => {
    const res = await request(app)
      .delete(`${URL_BASE}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
    await category.destroy()
  })