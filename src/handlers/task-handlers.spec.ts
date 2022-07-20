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
  describe('POST /tasks', () => {
    it('should be able to create a new task', async () => {
      const data = {
        title: 'Task 3',
        description: 'Task 3 description',
        userId: user.id
      }
      const response = await request(app).post('/tasks').send(data)
      const taskInDatabase = await prisma.task.findMany({
        where: {
          id: response.body.id
        }
      })
      expect(response.status).toBe(201)
      expect(taskInDatabase).toBeTruthy()
      expect(JSON.stringify(taskInDatabase)).toEqual(JSON.stringify([response.body]))
    })
  })
})
