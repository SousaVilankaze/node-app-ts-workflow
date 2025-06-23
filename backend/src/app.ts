import express, { Application, Request, Response } from "express";
import { userData } from "./data/user.data";
import { User } from "./interface/User";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid'
import cors from "cors"

const app: Application = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const config_cors = cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

app.use(config_cors);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
})

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello!');
})


const addUser = async (req: Request, res: Response) => {
  const user = req.body

  const data = new Date()
  console.log(`POST: User - ${data}`)

  try {
    if (user) {

      const createUser: User = {
        id: uuidv4(),
        ...user
      }

      userData.push(createUser)
      res.status(200).json(createUser)
      return
    }
    res.status(400).json({ error: "User not created." })
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error: "Wrong way!" })
  }
}

const getUsers = async (req: Request, res: Response) => {
  const data = new Date()
  console.log(`GET: Users - ${data}`)
  try {
    userData.length ?
      res.status(200).json(userData) :
      res.status(400).json({ error: "Não há utilizadores!" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Wrong way!" })
  }
}

app.post("/user", addUser)
app.get("/user", getUsers)

export default app 