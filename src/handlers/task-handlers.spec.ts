import { Task, User } from "@prisma/client"
import request from "supertest"
import app from "../app"
import { prisma } from "../config/prisma-client"

describe('Given the tasks reources', () => {
  let user: User
  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'contact@john.com'
      }
    })
  })
  afterAll(async () => { 
    await prisma.task.deleteMany({})
    await prisma.user.deleteMany({})
   
  })
  describe('GET /tasks', () => {
    let tasks: Task[]
    beforeAll(async () => {
      await prisma.task.createMany({
        data: [
          {
          title: 'Task 1',
          description: 'Task 1 description',
          userId: user.id
          },
          {
          title: 'Task 2',
          description: 'Task 2 description',
          userId: user.id
          }
        ]
      })
      tasks = await prisma.task.findMany()
    })
    it('should be able to list all tasks',async() => {
      const response = await request(app).get('/tasks')

      expect(response.status).toBe(200)
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(tasks))
    })
  })

})
