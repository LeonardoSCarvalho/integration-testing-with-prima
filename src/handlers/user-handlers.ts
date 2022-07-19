
import { Router } from "express";
import { prisma } from "../config/prisma-client";


export const userHandlers = Router();

userHandlers.get('/users', async(request, response) => {
  const users = await prisma.user.findMany()
  response.json(users)
})
userHandlers.post('/users', async(request, response) => {
  const { name, email } = request.body
  const user = await prisma.user.create({
    data: {
      name,
      email
    }
  })
  response.status(201).json(user)
})