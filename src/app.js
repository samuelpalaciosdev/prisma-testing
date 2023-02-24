// Create a simple express server
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const prisma = require('./services/prisma')
// Routes
const userRouter = require('./routes/userRoutes')
// Extra packages
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.use('/api/users', userRouter)

const start = async () => {
  try {
    await prisma.$connect()
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
