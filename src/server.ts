import express  from 'express'
import { userHandlers } from './handlers/user-handlers'

const app = express()
app.use(express.json())
app.use(userHandlers)

app.listen(3000, () => console.log('Serve running on port 3000'))