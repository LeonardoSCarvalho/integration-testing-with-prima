import { User } from "@prisma/client"
import { prisma } from "../config/prisma-client"
import request from "supertest"
import app from "../app"

describe('Given the users resources', () => {
  let users: User[]
  describe('GET /users', () => {
    beforeAll(async () => {
      await prisma.user.createMany({
        data: [
          {
            name: 'John Doe',
            email: 'contact@johndoe.com',
          },
          {
            name: 'Jane Doe',
            email: 'contact@janedoe'
          }
        ]
      })
      users = await prisma.user.findMany()
    })
    it('should be able to list all users', async () =>{
      const response = await request(app).get('/users')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(users)
    })

    it('should be create user', async () => {
      const response = await request(app).post('/users').send({
        name: 'any name',
        email: 'any@mail.com'
      })
      expect(response.status).toBe(201)
    })
  })
})
